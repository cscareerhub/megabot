import client from '../../client';
import { defaultStrings } from './constants';
import { get } from '../../environment';
import {
  attachmentIsAllowed,
  deleteAndReturnMessage,
  isMessageReply
} from './utils';

client.on('messageCreate', async (message) => {
  const { author } = message;

  // Run routine based on id
  switch (message.channelId) {
    // Career questions channel
    case get('CAREER_QUESTIONS_CHANNEL_ID'):
      // Check if a message is a reply to a top-level message
      // Note: Threads have a different ID than top-level channels
      if (isMessageReply(message)) {
        author.send(defaultStrings.invalidReply('career-questions'));
        deleteAndReturnMessage(message);
        return;
      }

      // Create a new thread under each message sent
      message.startThread({
        name: defaultStrings.careerQuestion(author.username)
      });
      break;

    // Resume review channel
    case get('RESUME_REVIEW_CHANNEL_ID'):
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

      // Attach thread to their resume review
      message.startThread({
        name: defaultStrings.resumeReview(author.username)
      });
      break;

    // Do nothing for other channels
    default:
  }
});
