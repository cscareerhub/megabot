import client from '../../../../client';
import lmgtfy from '../lmgtfy';
import * as permUtils from '../../../../utils/perms';

describe('lmgtfy', () => {
  beforeEach(() => {
    client.message = {
      author: {
        discriminator: 1234,
        send: jest.fn(),
        username: 'test-user'
      },
      channel: {
        send: jest.fn()
      }
    };

    client.prefix = '++';
  });

  test('when user has insufficient permissions', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => true);

    lmgtfy.handler(['Nik', 'Hello', 'World.', '<>&>']);

    expect(client.message.channel.send).not.toHaveBeenCalled();
  });

  test('when full run through', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => false);

    lmgtfy.handler(['Nik', 'Hello', 'World.', '<>&>']);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'https://lmgtfy.app/?q=Nik+Hello+World.+%3C%3E%26%3E'
    );
  });
});
