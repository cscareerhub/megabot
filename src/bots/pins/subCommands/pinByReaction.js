import client from '../../../client';
import { defaultStrings } from '../../../constants';
import { getMemberFromUser, isContributor, isMod } from '../../../utils/perms';
import { pinEmoji, strings } from '../constants';

/**
 * Handles the onMessageReaction and onMessgaeReactionRemove events
 * by checking roles and pinning or messaging accordingly
 * @param {Object.<string, any>} reaction - the MessageReaction object
 * @param {Object.<string, any>} user - the User who reacted or removed a reaction
 * @param {string} action - specifies whether to add or remove a pinned message
 */
const pinByReaction = async (reaction, user, action) => {
  if (reaction.emoji.name === pinEmoji) {
    const member = await getMemberFromUser(user);
    if (isContributor(member) || isMod(member)) {
      pin(reaction, action);
    } else {
      reaction.message.channel.send(defaultStrings.insufficientPermissions);
    }
  }
};

/**
 * Pins or unpins a message based on the action passed
 * @param {Object.<string, any>} reaction - the MessageReaction object
 * @param {string} action - specifies whether to add or remove a pinned message
 */
const pin = (reaction, action) => {
  action === 'add' &&
    reaction.message
      .pin()
      .then(() => {})
      .catch((err) => client.logger.error(err));

  action === 'remove' &&
    reaction.message
      .unpin()
      .then(() => reaction.message.channel.send(strings.successfullyUnpinned))
      .catch((err) => client.logger.error(err));
};

export default pinByReaction;
