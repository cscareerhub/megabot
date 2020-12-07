import client from '../../../client';
import handler from '../handler';

describe('ping event', () => {
  test('ping handler is called when ping event is emitted', () => {
    const logSpy = jest.spyOn(client.logger, 'debug');
    // Give handler() a msg.channel.send() since none is available in the test env
    handler({}, { channel: { send: () => {} } });
    expect(logSpy).toHaveBeenCalledWith('ping reached');
  });
});
