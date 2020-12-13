import { pinEmoji } from '../constants';
import { getMemberFromUser, isContributor, isMod } from '../../../utils/perms';

const pinByReaction = async (reaction, user, action) => {
  if (reaction.emoji.name === pinEmoji) {
    const member = await getMemberFromUser(user);
    if (isContributor(member) || isMod(member)) {
      pin(reaction, action);
    } else {
      reaction.message.channel.send(
        'You do not have permission to manage pins.'
      );
    }
  }
};

const pin = (reaction, action) => {
  action === 'add' && reaction.message.pin().catch((err) => console.log(err));

  action === 'remove' &&
    reaction.message
      .unpin()
      .then(() =>
        reaction.message.channel.send('The message has been unpinned.')
      )
      .catch((err) => console.log(err));
};

export default pinByReaction;
