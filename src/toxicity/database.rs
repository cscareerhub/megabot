use super::AttributeScores;

use std::io::{BufRead, Write};
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use serenity::model::prelude::{ChannelId, MessageId, UserId};

#[derive(Debug, Serialize, Deserialize)]
pub struct Scores {
    #[serde(flatten)]
    pub scores: AttributeScores,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub channel_id: Option<ChannelId>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub message_id: Option<MessageId>,
}

impl Scores {
    pub async fn load(
        base_path: &Path,
        user_id: UserId,
    ) -> Result<Vec<Self>, Box<dyn std::error::Error>> {
        let user_path = user_path(base_path, user_id);
        let file = match std::fs::OpenOptions::new()
            .write(true)
            .read(true)
            .create(true)
            .open(user_path)
        {
            Ok(file) => file,
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => return Ok(Vec::new()),
            Err(err) => return Err(err.into()),
        };
        let reader = std::io::BufReader::new(&file);

        let mut v = vec![];
        for line in reader.lines() {
            let scores: Self = serde_json::from_str(&line?)?;
            v.push(scores);
        }

        Ok(v)
    }

    pub async fn save(&self, user_id: UserId, base_path: &Path) {
        let user_path = user_path(base_path, user_id);

        if let Err(e) = async { std::fs::create_dir_all(user_path.parent().unwrap()) }.await {
            log::error!("Error creating toxicity dir for user `{user_id}`: {e}");
            return;
        }

        if let Err(e) = self.save_impl(&user_path).await {
            log::error!("Unable to save toxicity entry for user `{user_id}`: {e}");
        }
    }

    async fn save_impl(&self, user_path: &Path) -> std::io::Result<()> {
        let mut file = std::fs::OpenOptions::new()
            .create(true)
            .write(true)
            .append(true)
            .open(user_path)?;
        let mut data = serde_json::to_string(&self).unwrap();
        data.push('\n');
        file.write_all(data.as_bytes())?;
        Ok(())
    }
}

pub fn user_path(base_path: &Path, user_id: UserId) -> PathBuf {
    let mut path = base_path.to_path_buf();
    path.push(user_id.to_string());
    path.push("messages.db");
    path
}
