mod bot;
mod commands;
mod config;

use crate::config::Config;

use std::sync::Arc;
use std::{path::PathBuf, time::Duration};

use clap::Parser;
use notify::{Event, RecommendedWatcher, RecursiveMode, Watcher};
use parking_lot::RwLock;
use serenity::model::prelude::GuildId;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Path to the config file.
    #[arg(short, long)]
    config: Option<String>,
}

fn main() {
    pretty_env_logger::formatted_builder()
        .filter(None, log::LevelFilter::Warn)
        .filter(Some("megabot"), log::LevelFilter::Info)
        .parse_filters(&std::env::var("RUST_LOG").unwrap_or_default())
        .init();

    let args = Args::parse();

    let token = match std::env::var("DISCORD_TOKEN") {
        Ok(token) => token,
        Err(e) => {
            log::error!("Unable to retrieve DISCORD_TOKEN from environment: {e}");
            std::process::exit(1);
        }
    };

    let guild_id = match get_guild_id() {
        Ok(id) => id,
        Err(e) => {
            log::error!("Unable to retrieve DISCORD_GUILD_ID from environment: {e}");
            std::process::exit(1);
        }
    };

    let golinks_db_path = match std::env::var("DISCORD_GO_LINKS_DB_PATH") {
        Ok(path) => PathBuf::from(path),
        Err(e) => {
            log::error!("Unable to retrieve DISCORD_GO_LINKS_DB_PATH from environment: {e}");
            std::process::exit(1);
        }
    };

    let config_path = PathBuf::from(args.config.as_deref().unwrap_or(config::DEFAULT_PATH));
    let config = match Config::load(&config_path) {
        Ok(config) => config,
        Err(e) => {
            log::error!("{e}");
            std::process::exit(1);
        }
    };
    log::info!("Config loaded successfully: {}", config);
    let config = Arc::new(RwLock::new(config));

    let _watcher = match spawn_config_watcher(config_path, config.clone()) {
        Ok(watcher) => watcher,
        Err(e) => {
            log::error!("{e}");
            std::process::exit(1);
        }
    };

    let link_store = match kv::Store::open(&golinks_db_path) {
        Ok(store) => store,
        Err(e) => {
            log::error!(
                "Unable to open `{}`: {e}",
                golinks_db_path.to_string_lossy()
            );
            std::process::exit(1);
        }
    };

    let runtime = tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .unwrap();

    runtime.spawn(heartbeat());
    runtime.block_on(bot::run(token, guild_id, config, link_store));
}

async fn heartbeat() {
    let mut interval = tokio::time::interval(Duration::from_secs(60));

    let mut seq: u64 = 0;
    loop {
        interval.tick().await;
        log::info!("Hearthbeat: seq = {seq}");
        seq += 1;
    }
}

/// Spawns a thread that reloads the in-memory config on changes to the config file.
fn spawn_config_watcher(
    path: PathBuf,
    config: Arc<RwLock<Config>>,
) -> notify::Result<impl Watcher> {
    let mut watcher = {
        let path = path.clone();

        RecommendedWatcher::new(
            move |result: notify::Result<Event>| {
                let event = result.unwrap();

                if event.kind.is_modify() {
                    match Config::load(&path) {
                        Ok(updated_config) => {
                            *config.write() = updated_config;
                            log::info!("Config reloaded");
                        }
                        Err(e) => log::error!("Unable to load updated config: {e}"),
                    }
                }
            },
            notify::Config::default(),
        )
    }?;

    watcher.watch(&path, RecursiveMode::NonRecursive)?;

    Ok(watcher)
}

fn get_guild_id() -> Result<GuildId, Box<dyn std::error::Error>> {
    let guild_id: String = std::env::var("DISCORD_GUILD_ID")?;
    let guild_id: u64 = guild_id.parse()?;
    Ok(GuildId(guild_id))
}
