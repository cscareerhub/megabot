use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::command::CommandOptionType;
use serenity::model::prelude::interaction::application_command::{
    CommandDataOption, CommandDataOptionValue,
};
use url::Url;

pub fn exec(options: &[CommandDataOption], link_store: &kv::Store<Url>) -> String {
    let shortcut = get_shortcut(options).unwrap();
    match link_store.get(&shortcut) {
        Ok(Some(link)) => format!("`[{shortcut}]`: {link}"),
        Ok(None) => format!("No link registered under `{shortcut}`"),
        Err(e) => {
            log::error!("Link store error: {e}");
            "Server Error: Unable to fetch link :(".to_string()
        }
    }
}

fn get_shortcut(options: &[CommandDataOption]) -> Option<String> {
    match options.get(0).and_then(|opt| opt.resolved.as_ref()) {
        Some(CommandDataOptionValue::String(s)) => Some(s.clone()),
        _ => None,
    }
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command
        .name("go")
        .description("Link shortener")
        .create_option(|option| {
            option
                .name("shortcut")
                .description("The name of the shortcut")
                .kind(CommandOptionType::String)
                .required(true)
        })
        .create_option(|option| {
            option
                .name("link")
                .description("The link")
                .kind(CommandOptionType::String)
                .required(false)
        })
}
