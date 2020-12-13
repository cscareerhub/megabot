import { pinEmoji } from '../constants';
import { getMemberFromUser, isContributor, isMod } from '../../../utils/perms';

const pinByReaction = (reaction, action) => {
  if (reaction.emoji.name === pinEmoji) {
    reaction.users.cache.each(async (user) => {
      const member = await getMemberFromUser(user);
      if (isContributor(member) || isMod(member)) {
        pin(reaction, action);
      } else {
        reaction.message.channel.send(
          'You do not have permission to manage pins.'
        );
      }
    });
  }
};

const pin = (reaction, action) => {
  action === 'add' &&
    reaction.message
      .pin({ reason: 'important' })
      .catch((err) => console.log(err));

  action === 'remove' &&
    reaction.message
      .unpin({ reason: 'important' })
      .catch((err) => console.log(err));
};

export default pinByReaction;
