use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AttributeScores {
    toxicity: f64,
    severe_toxicity: f64,
    identity_attack: f64,
    insult: f64,
    threat: f64,
}

impl From<perspective::AttributeScores> for AttributeScores {
    fn from(scores: perspective::AttributeScores) -> AttributeScores {
        AttributeScores {
            toxicity: scores.toxicity.summary_score.value,
            severe_toxicity: scores.severe_toxicity.summary_score.value,
            identity_attack: scores.identity_attack.summary_score.value,
            insult: scores.insult.summary_score.value,
            threat: scores.threat.summary_score.value,
        }
    }
}

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
