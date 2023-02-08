use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Duration;

use crossbeam::channel::Sender;
use fxhash::FxHashMap;
use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use serenity::model::id::UserId;

/// Scores of probabilities between 0 and 1 that a message could be perceived as a given kind.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AttributeScores {
    pub toxicity: u8,
    pub severe_toxicity: u8,
    pub identity_attack: u8,
    pub insult: u8,
    pub threat: u8,
}

impl From<perspective::AttributeScores> for AttributeScores {
    fn from(scores: perspective::AttributeScores) -> AttributeScores {
        AttributeScores {
            toxicity: (scores.toxicity.summary_score.value * 100.0) as u8,
            severe_toxicity: (scores.severe_toxicity.summary_score.value * 100.0) as u8,
            identity_attack: (scores.identity_attack.summary_score.value * 100.0) as u8,
            insult: (scores.insult.summary_score.value * 100.0) as u8,
            threat: (scores.threat.summary_score.value * 100.0) as u8,
        }
    }
}

pub struct Message {
    pub user_id: UserId,
    pub content: String,
}

pub fn start_batcher(api_key: String, base_path: PathBuf) -> Sender<Message> {
    let (send, recv) = crossbeam::channel::unbounded::<Message>();

    let batch_data = Arc::new(Mutex::new(FxHashMap::<UserId, String>::default()));

    {
        let batch_data = batch_data.clone();
        std::thread::spawn(move || {
            while let Ok(msg) = recv.recv() {
                log::info!("Toxicity Batcher Channel Size: {}", recv.len());
                let mut inner = batch_data.lock();
                match inner.get_mut(&msg.user_id) {
                    Some(value) => {
                        value.push('\n');
                        value.push_str(&msg.content);
                    }
                    None => {
                        inner.insert(msg.user_id, msg.content);
                    }
                }
            }
        });
    }

    std::thread::spawn(move || {
        use rand::seq::IteratorRandom;

        let runtime = tokio::runtime::Builder::new_current_thread()
            .enable_all()
            .build()
            .unwrap();

        let base_path = base_path;
        let client = reqwest::Client::new();
        let mut rng = rand::thread_rng();

        runtime.block_on(async {
            const MINUTE: Duration = Duration::from_secs(60);
            let mut interval = tokio::time::interval(MINUTE / 30);

            loop {
                interval.tick().await;

                let (user_id, comments) = {
                    let mut inner = batch_data.lock();
                    if let Some(user_id) = inner.keys().choose(&mut rng).map(Clone::clone) {
                        log::info!("Profiling user {user_id}");
                        (user_id, inner.remove(&user_id).unwrap())
                    } else {
                        continue;
                    }
                };

                match analyze(&comments, &client, &api_key).await {
                    Ok(scores) => {
                        save(user_id, scores, base_path.clone()).await;
                    }
                    Err(err) => {
                        log::error!("Unable to analyze comments for user `{user_id}`: {err}")
                    }
                }
            }
        });
    });

    send
}

async fn save(user_id: UserId, scores: AttributeScores, base_path: PathBuf) {
    let user_path = user_path(&base_path, user_id);

    if let Err(e) = async { std::fs::create_dir_all(user_path.parent().unwrap()) }.await {
        log::error!("Error creating toxicity dir for user `{user_id}`: {e}");
        return;
    }

    if let Err(e) =
        async { kv::Store::open(&user_path).map(|store| store.set(&user_id.to_string(), &scores)) }
            .await
    {
        log::error!("Unable to save toxicity entry for user `{user_id}`: {e}");
    }
}

pub fn user_path(base_path: &Path, user_id: UserId) -> PathBuf {
    let mut path = base_path.to_path_buf();
    path.push(user_id.to_string());
    path.push("messages.db");
    path
}

/// Analyze some text to determine how toxic it is.
///
/// Utilizes the [Perspective API](https://perspectiveapi.com/).
pub async fn analyze(
    comment: &str,
    client: &reqwest::Client,
    api_key: &str,
) -> Result<AttributeScores, reqwest::Error> {
    let response = client
        .post(format!(
            "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={api_key}"
        ))
        .json(&perspective::Request::new(comment))
        .send()
        .await?
        .json::<perspective::Response>()
        .await?;

    Ok(AttributeScores::from(response.attribute_scores))
}

mod perspective {
    use std::collections::BTreeMap;

    use lazy_static::lazy_static;
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize)]
    struct Comment<'a> {
        text: &'a str,
    }

    #[derive(Debug, Serialize)]
    pub struct Request<'a> {
        comment: Comment<'a>,
        requested_attributes: &'static RequestedAttributes,
        languages: [&'static str; 1],
    }

    type RequestedAttributes = BTreeMap<String, ()>;

    lazy_static! {
        static ref ATTRIBUTES: RequestedAttributes = {
            let mut attributes = BTreeMap::new();
            attributes.insert("TOXICITY".to_string(), ());
            attributes.insert("SEVERE_TOXICITY".to_string(), ());
            attributes.insert("IDENTITY_ATTACK".to_string(), ());
            attributes.insert("INSULT".to_string(), ());
            attributes.insert("THREAT".to_string(), ());
            attributes
        };
    }

    #[derive(Debug, Deserialize)]
    pub struct SummaryScore {
        pub value: f64,
    }

    #[derive(Debug, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct Score {
        pub summary_score: SummaryScore,
    }

    #[derive(Debug, Deserialize)]
    #[serde(rename_all = "SCREAMING_SNAKE_CASE")]
    pub struct AttributeScores {
        pub toxicity: Score,
        pub severe_toxicity: Score,
        pub identity_attack: Score,
        pub insult: Score,
        pub threat: Score,
    }

    #[derive(Debug, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct Response {
        pub attribute_scores: AttributeScores,
    }

    impl<'a> Request<'a> {
        pub fn new(comment: &str) -> Request {
            Request {
                comment: Comment { text: comment },
                requested_attributes: &ATTRIBUTES,
                languages: ["en"],
            }
        }
    }
}
