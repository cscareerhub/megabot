# CSCH Megabot

A megabot for everything CSCH needs, composed of smaller mostly standalone packages. This project uses [Discord.js](https://discord.js.org/#/).

## Getting Started

1. Clone repo.

```
git clone https://github.com/cscareerhub/megabot.git
```

2. Use [nvm](https://github.com/nvm-sh/nvm) to switch to Node version 14.

```
nvm install 14
nvm use 14
```

3. Use yarn to install dependencies.

```
yarn install
```

4. Get tester bot token and set a variable in `.env`.

```
BOT_TOKEN=yourtesttoken
```

5. Run bot.

```
yarn start
```

## Contributing

0. Optional: Join us on the CSCH Discord server where we will give you access to the bot dev channel where we discuss and test bots.

1. Use the Prettier plugin to autoformat your code based on eslint configs if you use VSCode or other editor with support for something similar.

2. When making a change, create a branch with naming scheme such as

```
feature/<yourfeature>
bugfix/<yourbugfix>
```

3. Create a pull request which will require at least one review from CSCH staff. If it's been over a week, feel free to ping us once in the Discord.
