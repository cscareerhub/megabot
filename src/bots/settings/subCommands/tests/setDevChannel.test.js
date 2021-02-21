import client from '../../../../client';
import setDevChannel from '../setDevChannel';
import * as permUtils from '../../../../utils/perms';

describe('setting dev channel', () => {
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

  test('insufficient permissions returns early', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => true);

    await setDevChannel.handler();

    expect(client.message.channel.send).not.toHaveBeenCalled();
  });

  test('settings updates dev channel ID', async () => {
    await setDevChannel.handler();

    expect(process.env['DEV_CHANNEL_ID']).toEqual('12321');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'The dev channel has been updated to the current one.'
    );
  });
});
