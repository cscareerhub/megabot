use crate::config::{Config, Feature};
use crate::{commands, toxicity};

use std::path::PathBuf;
use std::sync::Arc;

use parking_lot::RwLock;
use serenity::async_trait;
use serenity::model::channel::Reaction;
use serenity::model::gateway::Ready;
use serenity::model::prelude::interaction::{Interaction, InteractionResponseType};
use serenity::model::prelude::{
    ChannelId, GuildId, Message, MessageId, PartialMember, ReactionType, RoleId, UserId,
};
use serenity::prelude::*;
use url::Url;

pub async fn run(
    token: String,
    guild_id: GuildId,
    config: Arc<RwLock<Config>>,
    link_store: kv::Store<Url>,
    toxicity_analyzer: toxicity::Analyzer,
) {
    // Set gateway intents, which decides what events the bot will be notified about
    let intents = GatewayIntents::GUILD_MESSAGES
        | GatewayIntents::GUILD_MESSAGE_REACTIONS
        | GatewayIntents::DIRECT_MESSAGES
        | GatewayIntents::MESSAGE_CONTENT;

    let handler = Handler {
        guild_id,
        config,
        http_client: reqwest::Client::new(),
        link_store,
        toxicity_analyzer,
    };

    let mut client = Client::builder(&token, intents)
        .event_handler(handler)
        .await
        .expect("Err creating client");

    if let Err(e) = client.start().await {
        log::error!("Client error: {:?}", e);
    }
}

struct Handler {
    guild_id: GuildId,
    link_store: kv::Store<Url>,
    http_client: reqwest::Client,
    config: Arc<RwLock<Config>>,
    toxicity_analyzer: toxicity::Analyzer,
}

impl Handler {
    fn is_enabled(&self, feature: Feature) -> bool {
        self.config.read().enabled_features.contains(&feature)
    }

    fn perspective_api_key(&self) -> String {
        self.config.read().perspective_api_key.clone()
    }
}

#[async_trait]
impl EventHandler for Handler {
    async fn reaction_add(&self, ctx: Context, reaction: Reaction) {
        let Reaction {
            emoji,
            member,
            user_id,
            channel_id,
            message_id,
            ..
        } = reaction;

        if self.is_enabled(Feature::Pins) && is_pin_emoji(emoji) {
            let user_roles = roles_from_partial_member(member, user_id, self.guild_id, &ctx).await;

            if has_allowed_role(&user_roles, &self.config.read().pin_roles) {
                log::info!("Pinning message {}", reaction.message_id);
                if let Err(e) = pin_message(ctx, channel_id, message_id).await {
                    log::error!("Unable to pin message: {e}");
                }
            }
        }
    }

    async fn reaction_remove(&self, ctx: Context, reaction: Reaction) {
        let Reaction {
            emoji,
            member,
            user_id,
            channel_id,
            message_id,
            ..
        } = reaction;

        if self.is_enabled(Feature::Pins) && is_pin_emoji(emoji) {
            let user_roles = roles_from_partial_member(member, user_id, self.guild_id, &ctx).await;

            if has_allowed_role(&user_roles, &self.config.read().pin_roles) {
                log::info!("Unpinning message {}", reaction.message_id);
                if let Err(e) = unpin_message(ctx, channel_id, message_id).await {
                    log::error!("Unable to unpin message: {e}");
                }
            }
        }
    }

    async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        if let Interaction::ApplicationCommand(command) = interaction {
            log::info!(
                "Received {} command from user {}",
                command.data.name,
                command.user.id.0
            );

            let response_data = match command.data.name.as_str() {
                "ping" => format!("Pong! Megabot version: {}", env!("CARGO_PKG_VERSION")),
                "codefmt" => commands::codefmt::exec(&command.data.options),
                "go" => commands::go::exec(&command.data.options, &self.link_store),
                "golink" => commands::golink::exec(&command.data.options, &self.link_store),
                "analyze" => {
                    commands::analyze::exec(
                        &command.data.options,
                        &self.http_client,
                        &self.perspective_api_key(),
                    )
                    .await
                }
                "profile" => {
                    commands::profile::exec(&command.data.options, &self.toxicity_analyzer.database_path).await
                }
                _ => "command not yet implemented".to_string(),
            };

            let result = command
                .create_interaction_response(&ctx.http, |response| {
                    response
                        .kind(InteractionResponseType::ChannelMessageWithSource)
                        .interaction_response_data(|message| message.content(response_data))
                })
                .await;

            if let Err(e) = result {
                log::error!("Unable to respond to command: {e}");
            }
        }
    }

    async fn message(&self, _ctx: Context, message: Message) {
        self.toxicity_analyzer.send(message).await;
    }

    async fn ready(&self, ctx: Context, ready: Ready) {
        log::info!("{} is connected!", ready.user.name);

        let result = self
            .guild_id
            .set_application_commands(&ctx.http, |commands| {
                commands
                    .create_application_command(commands::ping::register)
                    .create_application_command(commands::codefmt::register)
                    .create_application_command(commands::go::register)
                    .create_application_command(commands::golink::register)
                    .create_application_command(commands::analyze::register)
                    .create_application_command(commands::profile::register)
            })
            .await;

        if let Err(e) = result {
            log::error!("Unable to create commands: {e}");
            std::process::exit(1);
        }
    }
}

async fn roles_from_partial_member(
    member: Option<PartialMember>,
    user_id: Option<UserId>,
    guild_id: GuildId,
    ctx: &Context,
) -> Vec<RoleId> {
    match (member, user_id) {
        (Some(member), _) => member.roles,
        (None, Some(user_id)) => fetch_user_roles(ctx, user_id, guild_id).await,
        _ => {
            log::error!("Unable to extract roles from member: no member info");
            Vec::new()
        }
    }
}

async fn fetch_user_roles(ctx: &Context, user_id: UserId, guild_id: GuildId) -> Vec<RoleId> {
    match ctx
        .http
        .get_member(guild_id.0, user_id.0)
        .await
        .map(|m| m.roles)
    {
        Ok(roles) => roles,
        Err(e) => {
            log::error!("Unable to fetch roles for user {user_id}: {e}");
            Vec::new()
        }
    }
}

async fn pin_message(
    ctx: Context,
    channel_id: ChannelId,
    message_id: MessageId,
) -> serenity::Result<()> {
    let message = ctx.http.get_message(channel_id.0, message_id.0).await?;

    message.pin(ctx.http).await
}

async fn unpin_message(
    ctx: Context,
    channel_id: ChannelId,
    message_id: MessageId,
) -> serenity::Result<()> {
    let message = ctx.http.get_message(channel_id.0, message_id.0).await?;

    message.unpin(ctx.http).await
}

fn has_allowed_role(roles: &[RoleId], allowed_roles: &[RoleId]) -> bool {
    for role in roles {
        if allowed_roles.contains(role) {
            return true;
        }
    }
    false
}

fn is_pin_emoji(reaction_type: ReactionType) -> bool {
    const PIN_EMOJI: &str = "📌";

    match reaction_type {
        ReactionType::Unicode(emoji) => emoji == PIN_EMOJI,
        _ => false,
    }
}
