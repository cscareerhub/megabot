import dotenv from 'dotenv';

/**
 * Define environment variables imported from .env
 */
dotenv.config();
export const { BOT_TOKEN, ENV, MONGODB } = process.env;

/**
 * Define development envs to compare with ENV
 */
export const envs = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TESTING: 'testing'
};

/**
 * Define the prefix that all server commands must begin with
 */
export const prefix = '++';

/**
 * Define the valid commands that the bot will repsond to
 */
export const validCommands = [
  'ama',
  'faq',
  'pins',
  'ping',
  'salary',
  'settings'
];
