import { dedent } from '../../utils';

/**
 * String object with functions that return strings with args
 */
export const strings = {
  dmOnly: 'Please send this through direct message to bot',
  explanation:
    'Direct message bot with ++mc -a <message> to privately message mods.\nRemove -a flag to include discord name (otherwise anonymous).',
  success: (arg) =>
    dedent(`Message has been forwarded to moderation team.
      If you wish to follow up with them please reference the following id: **${arg}**`)
};
