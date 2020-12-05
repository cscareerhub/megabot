import Discord from 'discord.js';
import dotenv from 'dotenv';
import logger from 'winston';

// Environment variables
dotenv.config();
export const { BOT_TOKEN, MONGODB } = process.env;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Start client
const client = new Discord.Client();
client.logger = logger;

export default client;
