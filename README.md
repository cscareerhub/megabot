# CSCH Megabot

A megabot for everything CSCH needs, composed of smaller mostly standalone packages. This project uses [Discord.js](https://discord.js.org/#/).

## Getting Started

0. Install prerequisites.

- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

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

4. Use `.env.template` to set up env variables. Set `ENV` to `testing` if you're running unit tests.

```
BOT_TOKEN=yourbottoken
...
```

5. Run bot.

```
yarn start
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

4. Format your code to the project's specifications using Prettier. You can either use an editor plugin to do it automatically or run `yarn format`.

5. Once you've made change, create a pull request to the CSCH megabot repo's master branch with the type of change, which should correspond to the first part of your branch name, in the PR title.

```
branch name: docs/change
PR title: [docs] Changed this and that
```

All PRs will require at least one review from CSCH staff. If it's been over a week, feel free to ping us once in the Discord.
