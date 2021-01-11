import client from '../../../client';
import handlePrivateMessage from '../messageHandler';
import * as utils from '../../../utils/index';

describe('handlePrivateMessage', () => {
  test('messages when user provides no arguments', async () => {
    client.message.content = '++mc';

    await handlePrivateMessage();

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Direct message bot with ++mc -a <message> to privately message mods.\nRemove -a flag to include discord name (otherwise anonymous).'
    );
  });

  test('messages when user does not use DMChannel', async () => {
    client.message.content = '++mc hello world';

    await handlePrivateMessage();

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Please send this through direct message to bot'
    );
  });

  test.skip('sends success message when everything is sent', async () => {
    let modChannelMock = {
      send: jest.fn()
    };

    let successPattern = /^Message has been forwarded to moderation team.\nIf you wish to follow up with them please reference the following id: \*\*.+\*\*$/;

    jest
      .spyOn(utils, 'getModChannel')
      .mockImplementationOnce(() => modChannelMock);

    client.message.content = '++mc hello world';

    await handlePrivateMessage();

    expect(modChannelMock.send).toHaveBeenCalled();
    expect(client.message.channel.send).toHaveBeenCalledWith(
      expect.stringMatching(successPattern)
    );
  });

  beforeEach(async () => {
    client.message = {
      author: {
        discriminator: 1234,
        username: 'test-user'
      },
      channel: {
        send: jest.fn()
      }
    };
  });
});