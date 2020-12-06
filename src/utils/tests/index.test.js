import { parseMessage } from '../index';

test('parseMessage', () => {
  expect(parseMessage('++faq')).toEqual({ cmd: 'faq', subCmd: undefined });
});
