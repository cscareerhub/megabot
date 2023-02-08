use std::ops::Add;
use std::path::Path;

use crate::toxicity;

use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::command::CommandOptionType;
use serenity::model::prelude::interaction::application_command::{
    CommandDataOption, CommandDataOptionValue,
};
use serenity::model::prelude::UserId;

pub async fn exec(options: &[CommandDataOption], toxicity_base_path: &Path) -> String {
    let (user_id, username) = get_user(options).unwrap();
    let user_path = toxicity::user_path(toxicity_base_path, user_id);

    match kv::Store::<toxicity::AttributeScores>::open(&user_path).map(|s| s.to_map()) {
        Ok(Ok(store)) => {
            let n = store.len() as u64;
            let mut aggregate: AggregateScore = store
                .values()
                .map(AggregateScore::from)
                .reduce(Add::add)
                .unwrap_or_default();
            aggregate.toxicity /= n;
            aggregate.severe_toxicity /= n;
            aggregate.identity_attack /= n;
            aggregate.insult /= n;
            aggregate.threat /= n;
            format!("Toxicity profile for `{username}`: {aggregate:?}")
        }
        Ok(Err(err)) => {
            log::error!("Error while trying to read profile for user `{user_id}`: {err}");
            format!("Unable to read profile for `{username}` :(")
        }
        Err(err) if err.kind() == std::io::ErrorKind::NotFound => {
            format!("No profile for user `{username}`")
        }
        Err(err) => {
            log::error!("Error while trying to read profile for user `{user_id}`: {err}");
            format!("Unable to read profile for `{username}` :(")
        }
    }
}

#[derive(Debug, Default)]
struct AggregateScore {
    toxicity: u64,
    severe_toxicity: u64,
    identity_attack: u64,
    insult: u64,
    threat: u64,
}

impl Add for AggregateScore {
    type Output = AggregateScore;

    fn add(self, rhs: Self) -> Self::Output {
        AggregateScore {
            toxicity: self.toxicity + rhs.toxicity,
            severe_toxicity: self.severe_toxicity + rhs.severe_toxicity,
            identity_attack: self.identity_attack + rhs.identity_attack,
            insult: self.insult + rhs.insult,
            threat: self.threat + rhs.threat,
        }
    }
}

impl From<&toxicity::AttributeScores> for AggregateScore {
    fn from(value: &toxicity::AttributeScores) -> Self {
        AggregateScore {
            toxicity: value.toxicity as u64,
            severe_toxicity: value.severe_toxicity as u64,
            identity_attack: value.identity_attack as u64,
            insult: value.insult as u64,
            threat: value.threat as u64,
        }
    }
}

fn get_user(options: &[CommandDataOption]) -> Option<(UserId, String)> {
    match options.get(0).and_then(|opt| opt.resolved.as_ref()) {
        Some(CommandDataOptionValue::User(user, _)) => Some((user.id, user.name.clone())),
        _ => None,
    }
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command
        .name("profile")
        .description("Returns the toxicity profile for the given user.")
        .create_option(|option| {
            option
                .name("user")
                .description("The user to profile")
                .kind(CommandOptionType::User)
                .required(true)
        })
}
