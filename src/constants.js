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
