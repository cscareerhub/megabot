import dotenv from 'dotenv';

// Env variables
dotenv.config();
export const { BOT_TOKEN, ENV, MONGODB } = process.env;

// Enums
export const envs = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TESTING: 'testing'
};

// Variables
export const guildId = '334891772696330241';
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
