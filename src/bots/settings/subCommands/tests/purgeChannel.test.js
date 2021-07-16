import client from '../../../../client';
import purge from '../purgeChannel';
import * as envUtils from '../../../../environment';
import * as permUtils from '../../../../utils/perms';

describe('purging channel', () => {
  let otherChannel = {
    send: jest.fn()
  };

  beforeEach(async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementation(() => false);

    client.message = {
      author: {
        toString: jest.fn()
      },
      channel: {
        clone: jest.fn(() => otherChannel),
        delete: jest.fn(),
        id: 12321,
        send: jest.fn(),
        updateOverwrite: jest.fn()
      },
      guild: {
        roles: {
          everyone: {}
        }
      }
    };

    jest.spyOn(envUtils, 'getElementsForChannelId').mockImplementation(() => {
      return [];
    });
  });

  test('insufficient permissions', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => true);

    await purge.handler([]);

    expect(client.message.channel.clone).not.toHaveBeenCalled();
    expect(otherChannel.send).not.toHaveBeenCalled();
  });

  test('could not create channel', async () => {
    client.message.clone = jest.fn(() => null);

    purge.handler([]);

    expect(client.message.channel.clone).toHaveBeenCalled();
    expect(otherChannel.send).not.toHaveBeenCalled();
  });

  test('no args', async () => {
    await purge.handler([]);

    expect(client.message.channel.clone).toHaveBeenCalled();

    expect(otherChannel.send).toHaveBeenCalled();
    expect(client.message.channel.delete).not.toHaveBeenCalled();
    expect(client.message.channel.updateOverwrite).not.toHaveBeenCalled();
  });

  test('delete called', async () => {
    await purge.handler(['delete']);

    expect(client.message.channel.clone).toHaveBeenCalled();

    expect(otherChannel.send).toHaveBeenCalled();
    expect(client.message.channel.delete).toHaveBeenCalled();
    expect(client.message.channel.updateOverwrite).not.toHaveBeenCalled();
  });

  test('lock called', async () => {
    await purge.handler(['lock']);

    expect(client.message.channel.clone).toHaveBeenCalled();

    expect(otherChannel.send).toHaveBeenCalled();
    expect(client.message.channel.delete).not.toHaveBeenCalled();
    expect(client.message.channel.updateOverwrite).toHaveBeenCalled();
  });
});
