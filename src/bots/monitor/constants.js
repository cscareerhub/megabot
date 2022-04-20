export const defaultStrings = {
  careerQuestion: (username) => `${username}'s Career Question`,
  invalidFormat:
    'Your submission was removed in #resume-review for this reason: Your resume must be an image or PDF.',
  noResume:
    'Your submission was removed in #resume-review for this reason: You must attach your resume (as an image or PDF) when posting in this channel.',
  resumeReview: (username) => `${username}'s Resume Review`
};

export const VALID_FORMATS = ['png', 'jpeg', 'jpg', 'pdf'];
