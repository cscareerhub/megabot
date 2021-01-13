import client from '../../../../client';
import setModChannel from '../setModChannel';
import * as permUtils from '../../../../utils/perms';

describe('setting mod channel', () => {
  test('insufficient permissions returns early', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => true);

    await setModChannel.handler();

    expect(client.message.channel.send).not.toHaveBeenCalled();
  });

  test('settings updates mod channel ID', async () => {
    await setModChannel.handler();

    expect(process.env['MOD_CHANNEL_ID']).toEqual('12321');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Updated mod channel to current one.'
    );
  });

  beforeEach(async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementation(() => false);

    client.message = {
      channel: {
        id: 12321,
        send: jest.fn()
      }
    };
  });
});
