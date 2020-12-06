import { parseMessage } from '../index';

describe('parseMessage', () => {
  test('returns cmd when valid', () => {
    expect(parseMessage('++faq')).toEqual({ cmd: 'faq', subCmd: undefined });
    expect(parseMessage('++pins')).toEqual({ cmd: 'pins', subCmd: undefined });
  });

  test('returns subcmd when present', () => {
    expect(parseMessage('++faq LC')).toEqual({ cmd: 'faq', subCmd: 'LC' });
  });

  test('undefined when cmd invalid', () => {
    expect(parseMessage('++invalid')).toEqual(undefined);
  });
});
