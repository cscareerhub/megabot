import { Intents } from 'discord.js';

// Enums
export const envs = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TESTING: 'testing'
};

// Commands
export const validCommands = [
  'ama',
  'faq',
  'mc',
  'misc',
  'pins',
  'ping',
  'salary',
  'settings'
];

// Strings shared across bots
export const defaultStrings = {
  dmOnly:
    'Please send your message to the bot through direct messages instead.',
  insufficientPermissions:
    'You have insufficient permissions to perform this action.',
  invalidSubCommand: (arg) =>
    `Invalid argument. Following arguments are permitted:${arg}`
};

// Client intents to give Discord client permissions
export const clientIntents = [
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_PRESENCES
];
