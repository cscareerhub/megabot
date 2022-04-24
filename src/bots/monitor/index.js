import client from '../../client';
import { CHANNEL_NAMES, defaultStrings } from './constants';
import {
  attachmentIsAllowed,
  deleteAndReturnMessage,
  getChannelIdForName,
  getChannelNameForId,
  getChannelPostTitleForName,
  isMessageReply
} from './utils';

client.on('messageCreate', async (message) => {
  const { author, channelId } = message;

  // Run routine based on id
  switch (channelId) {
    case getChannelIdForName(CHANNEL_NAMES.CAREER_QUESTIONS):
    case getChannelIdForName(CHANNEL_NAMES.HIRING):
    case getChannelIdForName(CHANNEL_NAMES.SHARE_YOUR_CONTENT):
      {
        // <=== VALIDATION ===>
        // Get the channel's name
        const channelName = getChannelNameForId(channelId);
        if (channelName === null) return;

        // Do not allow top-level messages as replies
        if (isMessageReply(message)) {
          author.send(defaultStrings.invalidReply(channelName));
          deleteAndReturnMessage(message);
          return;
        }

        // <=== CREATE NEW THREAD ===>
        // Create a new thread under each message sent
        const postTitle = getChannelPostTitleForName(channelName);
        message.startThread({
          name: defaultStrings.threadTitle(author.username, postTitle)
        });
      }
      break;

    // Resume review channel
    case getChannelIdForName(CHANNEL_NAMES.RESUME_REVIEW):
      {
        // <=== VALIDATION ===>
        // Remove message if it's a reply to a top-level message
        // Note: Threads have a different ID than top-level channels
        if (isMessageReply(message)) {
          author.send(defaultStrings.invalidReply('resume-review'));
          deleteAndReturnMessage(message);
          return;
        }

        // Verify a resume is attached to message
        if (message.attachments.size === 0) {
          author.send(defaultStrings.noResume);
          deleteAndReturnMessage(message);
          return;
        }

        // Verify that all attachments are in valid format for a resume
        if (!message.attachments.every((file) => attachmentIsAllowed(file))) {
          author.send(defaultStrings.invalidFormat);
          deleteAndReturnMessage(message);
          return;
        }

        // <=== CREATE NEW THREAD ===>
        // Get the post title
        const postTitle = getChannelPostTitleForName(
          CHANNEL_NAMES.RESUME_REVIEW
        );

        // Attach thread to their resume review
        message.startThread({
          name: defaultStrings.threadTitle(author.username, postTitle)
        });
      }

      break;

    // Do nothing for other channels
    default:
  }
});
