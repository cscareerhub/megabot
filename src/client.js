import Discord from 'discord.js';
import { dispatchCommand } from './dispatcher';
import logger from 'winston';
import mongoose from 'mongoose';
import { BOT_TOKEN, ENV, envs, prefix, validCommands } from './constants';

/**
 * Initialize the logger from winston
 */
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

/**
 * Start client and attach commands, logger, and prefixes
 */
const client = new Discord.Client();
client.commands = validCommands;
client.logger = logger;
client.prefix = prefix;

/**
 * Launch the client and log when connected or if there is an error with maintaining stable connection
 */
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

/**
 * Login client with BOT_TOKEN from .env
 */
if (ENV !== envs.TESTING) {
  client.login(BOT_TOKEN);
}

/**
 * Listen for message and send to dispatch when one is received
 * @param {Object} message - the message sent by a user
 */
client.on('message', (message) => dispatchCommand(message));

export default client;
