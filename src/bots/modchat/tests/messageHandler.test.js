import client from '../../../client';
import handlePrivateMessage from '../messageHandler';

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

  //   test('sends success message when everything is sent', async () => {
  //     client.message.content = '++mc hello world';

  //     let dmChannel = new DMChannel();
  //     dmChannel.send = jest.fn();

  //     client.message.channel = dmChannel;

  //     await handlePrivateMessage();

  //     expect(client.message.channel.send).toHaveBeenCalledWith('Please send this through direct message to bot');
  //   });

  beforeEach(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      }
    };
  });
});
