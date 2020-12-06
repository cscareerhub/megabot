import dotenv from 'dotenv';

// Environment variables
dotenv.config();
export const { BOT_TOKEN, MONGODB, ENV } = process.env;

// Variables
export const prefix = '++';
export const validCmds = ['ama', 'faq', 'pins', 'salary', 'settings', 'perms'];
