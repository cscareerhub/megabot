use crate::toxicity;

use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::command::CommandOptionType;
use serenity::model::prelude::interaction::application_command::{
    CommandDataOption, CommandDataOptionValue,
};

pub async fn run(options: &[CommandDataOption], client: &reqwest::Client, api_key: &str) -> String {
    let text = get_text(options).unwrap();
    match toxicity::analyze(text, client, api_key).await {
        Ok(score) => serde_json::to_string(&score).unwrap(),
        Err(e) => format!("Error from Perspective API: {e}"),
    }
}

fn get_text(options: &[CommandDataOption]) -> Option<&str> {
    match options.get(0).and_then(|opt| opt.resolved.as_ref()) {
        Some(CommandDataOptionValue::String(text)) => Some(text),
        _ => None,
    }
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command
        .name("analyze")
        .description("Analyzes a message and gives a probability of it being toxic.")
        .create_option(|option| {
            option
                .name("text")
                .description("Text to analyze")
                .kind(CommandOptionType::String)
                .required(true)
        })
}
