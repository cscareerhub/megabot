import onEventQuestion from '../onMessage';
import * as env from '../../../../environment';

describe('onMessage', () => {
  const message = {
    author: {
      bot: false
    },
    channel: {
      id: '777'
    },
    react: jest.fn()
  };

  test('nothing happens when wrong channel', async () => {
    jest.spyOn(env, 'get').mockImplementationOnce(() => '111');
    message.author.bot = false;

    await onEventQuestion(message);

    expect(message.react).not.toHaveBeenCalled();
  });

  test('nothing happens when author is bot', async () => {
    jest.spyOn(env, 'get').mockImplementationOnce(() => '777');
    message.author.bot = true;

    await onEventQuestion(message);

    expect(message.react).not.toHaveBeenCalled();
  });

  test('react happens when correct channel', async () => {
    jest.spyOn(env, 'get').mockImplementationOnce(() => '777');
    message.author.bot = false;

    await onEventQuestion(message);

    expect(message.react).toHaveBeenCalledWith('👍');
  });
});
