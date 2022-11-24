# CSCH Megabot

| License                                                                             | Github                                                                                                                           | Discord                                                       | 
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [![License](https://img.shields.io/github/license/cscareerhub/megabot)](LICENSE.md) | ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/cscareerhub/megabot/CI/master) | ![Discord](https://img.shields.io/discord/334891772696330241) | 

A megabot for everything CSCH needs, composed of smaller mostly standalone packages. This project uses [Serenity](https://github.com/serenity-rs/serenity).

## Getting Started

0. Install prerequisites.

- [Rust](https://rustup.rs/)

1. Clone repo.

```
git clone https://github.com/cscareerhub/megabot.git
```

2. Run bot.

```sh
DISCORD_TOKEN="your token" DISCORD_GUILD_ID="id of your test server" DISCORD_GO_LINKS_DB_PATH="test.db" cargo run --bin megabot -- --config example_config.toml
```

## Contributing

0. Optional: Join us on the CSCH Discord server where we will give you access to the bot dev channel where we discuss and test bots.

1. Assign yourself to the issue or request to be assigned.

2. Fork the repo.

3. Create a branch with the following naming scheme.

```
feature/<yourfeature>
bug/<yourbugfix>
docs/<yourdocchange>
test/<yourtestingchange>
misc/<yourmiscchange>
```

4. Once you've made change, create a pull request to the CSCH megabot repo's `master` branch with the type of change, which should correspond to the first part of your branch name, in the PR title.

```
branch name: docs/change
PR title: [docs] Changed this and that
```

All PRs will require at least one review from CSCH staff. If it's been over a week, feel free to ping us once in the Discord.

## Operation

The bot is operated on production using a standard Systemd service file, [megabot.service](megabot.service). As such, the usual systemd commands are all applicable for managing it.
In addition, a [justfile](justfile) is available for use with the [just command runner](https://github.com/casey/just). This acts as both a handy shortcut for common operations, 
and as documentation for the relevant operational commands of the bot.
