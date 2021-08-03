import client from '../../../../client';
import setEventChannel from '../setEventChannel';
import * as permUtils from '../../../../utils/perms';

describe('setting event channel', () => {
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

    await setEventChannel.handler();

    expect(client.message.channel.send).not.toHaveBeenCalled();
  });

  test('settings updates event channel ID', async () => {
    await setEventChannel.handler();

    expect(process.env['EVENT_QUESTIONS_CHANNEL_ID']).toEqual('12321');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'The event questions channel has been updated to the current one.'
    );
  });
});
