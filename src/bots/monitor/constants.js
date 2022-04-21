export const defaultStrings = {
  careerQuestion: (username) => `${username}'s Career Question`,
  invalidFormat:
    'Your submission was removed in #resume-review for this reason:\n`Your resume must be an image or PDF.`',
  invalidReply: (channel) =>
    `Your submission was removed in #${channel} for this reason:\n\`You cannot reply to top-level messages in this channel, you must only reply inside threads\`.`,
  noResume:
    'Your submission was removed in #resume-review for this reason:\n`You must attach your resume (as an image or PDF) when posting in this channel.`',
  resumeReview: (username) => `${username}'s Resume Review`,
  returnDeletedMsg: (str) => `Here is your removed message:\n${str}`
};

export const VALID_FORMATS = ['png', 'jpeg', 'jpg', 'pdf'];
