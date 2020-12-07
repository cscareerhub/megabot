import dotenv from 'dotenv';

// Environment variables
dotenv.config();
export const { BOT_TOKEN, ENV, MONGODB } = process.env;

// Variables
export const prefix = '++';
export const validCmds = ['ama', 'faq', 'pins', 'salary', 'settings', 'perms'];
