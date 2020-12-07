import client from '../../../client';

describe('ping event', () => {
  test('ping handler is called when ping event is emitted', () => {
    const logSpy = jest.spyOn(client.logger, 'debug');
    const msg = { channel: { send: jest.fn() } };
    client.emit('ping', [], msg);
    expect(logSpy).toHaveBeenCalledWith('ping reached');
    expect(msg.channel.send).toHaveBeenCalled();
  });
});
