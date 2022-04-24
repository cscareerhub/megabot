import { get } from '../../environment';

export const defaultStrings = {
  careerQuestion: (username) => `${username}'s Career Question`,
  invalidFormat:
    'Your submission was removed in #resume-review for this reason:\n`Your resume must be an image or PDF.`',
  invalidReply: (channel) =>
    `Your submission was removed in #${channel} for this reason:\n\`You cannot reply to top-level messages in this channel, you must only reply inside threads\`.`,
  noResume:
    'Your submission was removed in #resume-review for this reason:\n`You must attach your resume (as an image or PDF) when posting in this channel.`',
  resumeReview: (username) => `${username}'s Resume Review`,
  returnDeletedMsg: (str) => `Here is your removed message:\n${str}`,
  threadTitle: (username, postTitle) => `${username}'s ${postTitle}`
};

export const CHANNEL_INFORMATION = {
  'career-questions': {
    id: get('CAREER_QUESTIONS_CHANNEL_ID'),
    postTitle: 'Career Question'
  },
  hiring: {
    id: get('HIRING_CHANNEL_ID'),
    postTitle: 'Hiring Post'
  },
  'resume-review': {
    id: get('RESUME_REVIEW_CHANNEL_ID'),
    postTitle: 'Resume Review'
  },
  'share-your-content': {
    id: get('SHARE_YOUR_CONTENT_CHANNEL_ID'),
    postTitle: 'Share Your Content'
  }
};

/**
 * Enum for valid channel names
 * @enum {string}
 */
export const CHANNEL_NAMES = {
  CAREER_QUESTIONS: 'career-questions',
  HIRING: 'hiring',
  RESUME_REVIEW: 'resume-review',
  SHARE_YOUR_CONTENT: 'share-your-content'
};

export const VALID_FORMATS = ['png', 'jpeg', 'jpg', 'pdf'];
