import client from '../../../../client';
import setModChannel from '../setModChannel';
import * as permUtils from '../../../../utils/perms';

describe('setting mod channel', () => {
  test('settings returns error message when insufficient permissions', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);

    await setModChannel.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You have insufficient permissions to perform this action.'
    );
  });

  test('settings updates mod channel ID', async () => {
    await setModChannel.handler([]);

    expect(process.env['MOD_CHANNEL_ID']).toEqual('12321');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Update mod channel to current one.'
    );
  });

  beforeEach(async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementation(() => true);

    client.message = {
      channel: {
        id: 12321,
        send: jest.fn()
      }
    };
  });
});
