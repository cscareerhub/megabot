import {
  attachmentIsAllowed,
  getChannelPostTitleForName,
  isKnownChannelName,
  isMessageReply
} from '../utils';

describe('Automatically open threads for messages in specific channels', () => {
  test('valid attachment format', () => {
    expect(attachmentIsAllowed({ url: 'test.png' })).toBeTruthy();
    expect(attachmentIsAllowed({ url: 'test.jpg' })).toBeTruthy();
    expect(attachmentIsAllowed({ url: 'test.pdf' })).toBeTruthy();
  });

  test('invalid attachment format', () => {
    expect(attachmentIsAllowed({ url: 'test.bmp' })).toBeFalsy();
    expect(attachmentIsAllowed({ url: 'test.docx' })).toBeFalsy();
    expect(attachmentIsAllowed({ url: 'test.txt' })).toBeFalsy();
    expect(attachmentIsAllowed({ url: 'test' })).toBeFalsy();
  });

  test('checks if message is reply', () => {
    const replyMessage = { reference: 'something' };
    const notReplyMessage = { reference: null };

    expect(isMessageReply(replyMessage)).toBeTruthy();
    expect(isMessageReply(notReplyMessage)).toBeFalsy();
  });

  test('check allowed channel names', () => {
    expect(isKnownChannelName('career-questions')).toBeTruthy();
    expect(isKnownChannelName('hiring')).toBeTruthy();
    expect(isKnownChannelName('resume-review')).toBeTruthy();
    expect(isKnownChannelName('share-your-content')).toBeTruthy();
    expect(isKnownChannelName('not-a-real-channel')).toBeFalsy();
  });

  test('get post title for name', () => {
    expect(getChannelPostTitleForName('career-questions')).toBe(
      'Career Question'
    );
    expect(getChannelPostTitleForName('hiring')).toBe('Hiring Post');
    expect(getChannelPostTitleForName('resume-review')).toBe('Resume Review');
    expect(getChannelPostTitleForName('share-your-content')).toBe(
      'Share Your Content'
    );
  });
});
