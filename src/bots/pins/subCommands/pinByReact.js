import { pinEmoji } from '../constants';

const pinByReact = (reaction, action) => {
  if (reaction.emoji.name === pinEmoji) {
    action === 'add' &&
      reaction.message
        .pin({ reason: 'important' })
        .catch((err) => console.log(err));

    action === 'remove' &&
      reaction.message
        .unpin({ reason: 'important' })
        .catch((err) => console.log(err));
  }
};

export default pinByReact;
