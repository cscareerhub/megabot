import client from '../../../client';
import handler from '../handler';

describe('pins event', () => {
  test('pins handler is called when pins event is emitted', () => {
    const logSpy = jest.spyOn(client.logger, 'debug');
    handler(['list']);
    expect(logSpy).toHaveBeenCalledWith('list');
  });
});
