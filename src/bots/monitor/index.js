import { attachmentIsAllowed } from './validator';
import client from '../../client';
import { defaultStrings } from './constants';
import { get } from '../../environment';

client.on('messageCreate', async (message) => {
  const { author } = message;

  // Run routine based on id
  switch (message.channelId) {
    // Career questions channel
    case get('CAREER_QUESTIONS_CHANNEL_ID'):
      // Create a new thread under each message sent
      message.startThread({
        name: defaultStrings.careerQuestion(author.username)
      });
      break;

    // Resume review channel
    case get('RESUME_REVIEW_CHANNEL_ID'):
      // Verify a resume is attached to message
      if (message.attachments.size === 0) {
        author.send(defaultStrings.noResume);
        message.delete();
        return;
      }

      // Verify that all attachments are in valid format for a resume
      if (!message.attachments.every((file) => attachmentIsAllowed(file))) {
        author.send(defaultStrings.invalidFormat);
        message.delete();
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
