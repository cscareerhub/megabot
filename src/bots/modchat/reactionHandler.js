import generateEmbed from '../../utils/embed';
import { getModChannel } from '../../utils';
import { strings } from './constants';
import { warningEmoji } from './constants';
import { checkRuleList, getMemberFromUser } from '../../utils/perms';

/**
 * Method that does the following:
 * 1. Alerts mods of reacted message (:warning: emoji currently)
 * 2. Removes reaction to be safe
 * 3. Messages in an embed with a link
 *
 * @param {Object.<string, any>} reaction - the MessageReaction object
 * @param {Object.<string, any>} user - the User who reacted or removed a reaction
 * @param {string} action - specifies whether it was an add or removal action
 */
let alertModChannel = async (reaction, user, action) => {
  if (reaction.emoji.name !== warningEmoji || action !== 'add') {
    return;
  }

  const member = await getMemberFromUser(user);

  if (!checkRuleList(member)) {
    return;
  }

  let modChannel = await getModChannel();

  let url = reaction.message.url;
  let title = `${reaction.message.author.username}#${reaction.message.author.discriminator}`;
  let userName = `${user.username}#${user.discriminator}`;

  let footer = `Channel: ${reaction.message.channel.name} | Reported by: ${userName}`;
  let description = reaction.message.content;

  await reaction.users.remove(user.id);

  let embed = generateEmbed(
    {
      description,
      footer: footer,
      title
    },
    {
      color: '#FF0000'
    }
  );

  await modChannel.send(url, { embed });
  member.send(strings.modsHaveBeenMessaged);
};

export default alertModChannel;
