import { dedent } from '../../utils';

export const warningEmoji = '⚠️';

/**
 * String object with functions that return strings with args
 */
export const strings = {
  explanation:
    'Direct message the bot with `++mc -a <message>` to anonymously message the mod team.\nRemove the `-a` flag to include your Discord username.',
  modsHaveBeenMessaged: 'Mods have been contacted about the message.',
  success: (arg) =>
    dedent(`Your message has been forwarded to moderation team.
      If you wish to follow up with them please reference the following id: **${arg}**.`)
};
