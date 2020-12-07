import Discord from 'discord.js';
import logger from 'winston';
import mongoose from 'mongoose';
import { BOT_TOKEN, ENV, envs } from './constants';
import { dispatchCmd, parseMessage } from './utils/dispatcher';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Start client
const client = new Discord.Client();
client.logger = logger;

// Add debug listeners
client
  .on('ready', () => client.logger.info('Bot is connected'))
  .on('disconnect', () => {
    client.logger.warn('Bot is disconnecting');
    mongoose.connection
      .disconnect()
      .then(() => client.logger.info('DB is disconnected'))
      .catch((err) => client.logger.error(err));
  })
  .on('reconnecting', () => client.logger.info('Bot reconnecting'))
  .on('error', (err) => client.logger.error(err))
  .on('warn', (warn) => client.logger.warn(warn));

// Login client
if (ENV !== envs.TESTING) {
  client.login(BOT_TOKEN);
}

// Add message listeners
client
  .on('message', (msg) => parseMessage(msg))
  .on('command', (cmd, args) => dispatchCmd(cmd, args));

export default client;
