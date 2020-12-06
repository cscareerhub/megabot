import { BOT_TOKEN } from './utils/constants';
import Discord from 'discord.js';
import logger from 'winston';
import { emitCmd, parseMessage } from './utils/dispatcher';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Start client
const client = new Discord.Client();
client.logger = logger;

client
  .on('ready', () => client.logger.info('Bot is connected'))
  .on('disconnect', () => client.logger.warn('Bot is disconnecting'))
  .on('reconnecting', () => client.logger.info('Bot reconnecting'))
  .on('error', (e) => client.logger.log(e, 'error'))
  .on('warn', (info) => client.logger.log(info, 'warn'));

client.login(BOT_TOKEN);

client
  .on('message', (msg) => parseMessage(msg))
  .on('command', (cmd, args) => emitCmd(cmd, args));

export default client;
