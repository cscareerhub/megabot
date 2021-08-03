import { get } from '../../../environment';

const thumbsUp = '👍';

/**
 * Thumbs up reaction in event questions channel
 *
 * @param {Message} message Message object that is to be reacted to
 */
let onEventQuestion = async (message) => {
  if (message.channel.id !== get('EVENT_QUESTIONS_CHANNEL_ID')) {
    return;
  }

  if (message.author.bot) {
    return;
  }

  await message.react(thumbsUp);
};

export default onEventQuestion;
