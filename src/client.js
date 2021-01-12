import Discord from 'discord.js';
import { dispatchCommand } from './dispatcher';
import { get } from './environment';
import logger from 'winston';
import mongoose from 'mongoose';
import { envs, validCommands } from './constants';

// Configure logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize client
const client = new Discord.Client();
client.commands = validCommands;
client.logger = logger;
client.prefix = get('BOT_PREFIX');

// Attach debug listeners to client
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
if (get('ENV') !== envs.TESTING) {
  client.login(get('BOT_TOKEN'));
}

// Other client listeners
client.on('message', (message) => {
  const env = get('ENV');
  if (
    env === envs.TESTING ||
    (env === envs.DEVELOPMENT && get('DEV_CHANNEL_ID') === message.channel.id)
  ) {
    dispatchCommand(message);
  }
});

export default client;
