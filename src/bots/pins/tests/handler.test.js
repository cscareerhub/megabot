import client from '../../../client';
import handler from '../handler';

describe('pins event', () => {
  test('pins handler logs correct arg', () => {
    client.message = { content: '++pins list' };
    const logSpy = jest.spyOn(client.logger, 'debug');
    handler();
    expect(logSpy).toHaveBeenCalledWith('list');
  });
});
