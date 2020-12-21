import client from '../client';
import { dispatchCommand } from '../dispatcher';

describe('dispatchCommand', () => {
  test('emits command when valid', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    const message = { content: `${client.prefix}pins list` };
    dispatchCommand(message);
    expect(emitterSpy).toHaveBeenCalledWith('pins');
  });

  test('does not emit command when invalid', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    const message = { content: `${client.prefix}invalid list` };
    dispatchCommand(message);
    expect(emitterSpy).not.toHaveBeenCalled();
  });
});
