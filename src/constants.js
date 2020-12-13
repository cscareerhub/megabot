import dotenv from 'dotenv';

// Env variables
dotenv.config();
export const { BOT_TOKEN, ENV, MONGODB, GUILD_ID } = process.env;

// Enums
export const envs = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TESTING: 'testing'
};

// Variables
export const prefix = '++';
export const validCommands = [
  'ama',
  'faq',
  'pins',
  'ping',
  'salary',
  'settings'
];

export const defaultStrings = {
  invalidSubCommand: 'Invalid argument. Following arguments are permitted:'
};
