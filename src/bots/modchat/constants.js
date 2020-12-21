import { dedent } from '../../utils';

/**
 * Contructs string object with options
 * @param  {...any} options - data for strings and other options
 * @return {Object.<string, string>} - string object with all AMA bot strings
 */
export const getStrings = (...options) => {
  options = options || [{}];

  return {
    dmOnly: 'Please send this through direct message to bot',
    explanation:
      'Direct message bot with ++mc -a <message> to privately message mods.\nRemove -a flag to include discord name (otherwise anonymous).',
    success: dedent(`Message has been forwarded to moderation team.
        If you wish to follow up with them please reference the following id: **${options[0]}**`)
  };
};
