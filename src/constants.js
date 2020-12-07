import dotenv from 'dotenv';

// Environment variables
dotenv.config();
export const { BOT_TOKEN, ENV, MONGODB } = process.env;

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
