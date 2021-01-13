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
  'pins',
  'ping',
  'salary',
  'settings'
];

export const defaultStrings = {
  dmOnly:
    'Please send your message to the bot through direct messages instead.',
  insufficientPermissions:
    'You have insufficient permissions to perform this action.',
  invalidSubCommand: (arg) =>
    `Invalid argument. Following arguments are permitted:${arg}`
};
