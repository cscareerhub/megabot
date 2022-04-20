import { Client } from 'discord.js';
import { dispatchCommand } from './dispatcher';
import { get } from './environment';
import mongoose from 'mongoose';
import { processRawMessageForReactions } from './utils/rawMessageProxy';
import { shouldListen } from './utils';
import { clientIntents, envs, validCommands } from './constants';
import * as winston from 'winston';

// Configure logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.colorize()
  ),
  transports: [new winston.transports.Console({ level: 'debug' })]
});

// Initialize client
const client = new Client({ intents: clientIntents });
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
  .on('warn', (warn) => client.logger.warn(warn))
  .on('raw', (rawMessage) => processRawMessageForReactions(client, rawMessage));

// Login client
if (get('ENV') !== envs.TESTING) {
  client.login(get('BOT_TOKEN'));
}

// Other client listeners
client.on('messageCreate', (message) => {
  if (shouldListen(message)) {
    dispatchCommand(message);
  }
});

export default client;
