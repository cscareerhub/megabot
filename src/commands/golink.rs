use std::fmt::Write;

use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::command::CommandOptionType;
use serenity::model::prelude::interaction::application_command::{
    CommandDataOption, CommandDataOptionValue,
};
use url::Url;

enum Command {
    Add(String, String),
    Remove(String),
    List,
}

pub fn exec(options: &[CommandDataOption], link_store: &kv::Store<Url>) -> String {
    let command = get_command(options).unwrap();
    match command {
        Command::Add(shortcut, link) => add_shortcut(link_store, &shortcut, &link),
        Command::Remove(shortcut) => remove_shortcut(link_store, &shortcut),
        Command::List => list_shortcuts(link_store),
    }
}

fn add_shortcut(link_store: &kv::Store<Url>, shortcut: &str, link: &String) -> String {
    let link = match Url::parse(link) {
        Ok(url) => url,
        Err(err) => return format!("`{link}` is not a valid URL: {err}"),
    };
    match link_store.set(shortcut, &link) {
        Ok(()) => format!("{link} was registered under `{shortcut}`!"),
        Err(e) => {
            log::error!("Link store error: {e}");
            "Server Error: Unable to register shortcut :(".to_string()
        }
    }
}

fn remove_shortcut(link_store: &kv::Store<Url>, shortcut: &str) -> String {
    match link_store.unset(shortcut) {
        Ok(()) => format!("{shortcut} was unregistered!"),
        Err(e) => {
            log::error!("Link store error: {e}");
            "Server Error: Unable to unregister shortcut :(".to_string()
        }
    }
}

fn list_shortcuts(link_store: &kv::Store<Url>) -> String {
    match link_store.to_map() {
        Ok(links) => {
            let mut response = String::with_capacity(links.len() * 100);

            response.push_str("```");
            for (shortcut, link) in links {
                writeln!(response, "{shortcut} => {link}\n").unwrap();
            }
            response.push_str("```");

            response
        }
        Err(e) => {
            log::error!("Link store error: {e}");
            "Server Error: Unable to list shortcuts :(".to_string()
        }
    }
}

fn get_command(options: &[CommandDataOption]) -> Option<Command> {
    let opt = options.get(0)?;
    match opt.name.as_str() {
        "add" => {
            let shortcut = get_shortcut(opt.options.as_slice()).unwrap();
            let link = get_link(opt.options.as_slice()).unwrap();
            Command::Add(shortcut, link).into()
        }
        "remove" => Command::Remove(get_shortcut(opt.options.as_slice()).unwrap()).into(),
        "list" => Command::List.into(),
        cmd => {
            log::error!("Unknown golink command: {cmd}");
            None
        }
    }
}

fn get_shortcut(options: &[CommandDataOption]) -> Option<String> {
    match options.get(0).and_then(|opt| opt.resolved.as_ref()) {
        Some(CommandDataOptionValue::String(s)) => Some(s.clone()),
        _ => None,
    }
}

fn get_link(options: &[CommandDataOption]) -> Option<String> {
    match options.get(1).and_then(|opt| opt.resolved.as_ref()) {
        Some(CommandDataOptionValue::String(s)) => Some(s.clone()),
        _ => None,
    }
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command
        .name("golink")
        .description("Link shortener")
        .create_option(|option| {
            option
                .name("add")
                .description("Add a link shortcut")
                .kind(CommandOptionType::SubCommand)
                .create_sub_option(|option| {
                    option
                        .name("shortcut")
                        .description("Shortcut for this link")
                        .kind(CommandOptionType::String)
                        .required(true)
                })
                .create_sub_option(|option| {
                    option
                        .name("link")
                        .description("HTTP link registered to the shortcut")
                        .kind(CommandOptionType::String)
                        .required(true)
                })
        })
        .create_option(|option| {
            option
                .name("remove")
                .description("Remove a link shortcut")
                .kind(CommandOptionType::SubCommand)
                .create_sub_option(|option| {
                    option
                        .name("shortcut")
                        .description("Shortcut to remove")
                        .kind(CommandOptionType::String)
                        .required(true)
                })
        })
        .create_option(|option| {
            option
                .name("list")
                .description("List active shortcuts")
                .kind(CommandOptionType::SubCommand)
        })
}
