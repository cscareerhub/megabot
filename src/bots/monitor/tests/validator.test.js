import { attachmentIsAllowed } from '../validator';

describe('autoThreadCreation', () => {
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
});
