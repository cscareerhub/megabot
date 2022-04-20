import alertModChannel from '../reactionHandler';
import { beforeEach, jest } from '@jest/globals';
import * as permUtils from '../../../utils/perms';
import * as utils from '../../../utils/index';

describe('alertModChannel', () => {
  let reaction;
  const user = {};
  const member = {
    send: jest.fn()
  };
  const modChannel = {
    send: jest.fn()
  };

  beforeEach(async () => {
    reaction = {
      emoji: { name: '⚠️' },
      message: {
        author: {
          discriminator: 'test2',
          username: 'test'
        },
        channel: {
          send: jest.fn(),
          name: 'Test Channel'
        },
        content: 'Example message content.'
      },
      users: {
        remove: jest.fn()
      }
    };
  });

  jest.spyOn(permUtils, 'getMemberFromUser').mockImplementation(() => {
    return member;
  });

  jest.spyOn(utils, 'getModChannel').mockImplementationOnce(() => modChannel);

  test('nothing happens when wrong emoji', async () => {
    reaction.emoji = '🔞';

    await alertModChannel(reaction, user, 'add');

    expect(member.send).not.toHaveBeenCalled();
    expect(modChannel.send).not.toHaveBeenCalled();
    expect(reaction.users.remove).not.toHaveBeenCalled();
  });

  test('nothing happens when user has insufficient perms', async () => {
    jest.spyOn(permUtils, 'checkRuleList').mockImplementationOnce(() => false);

    await alertModChannel(reaction, user, 'add');

    expect(member.send).not.toHaveBeenCalled();
    expect(modChannel.send).not.toHaveBeenCalled();
    expect(reaction.users.remove).not.toHaveBeenCalled();
  });

  test('succeeds when everything is correct', async () => {
    jest.spyOn(permUtils, 'checkRuleList').mockImplementationOnce(() => true);

    await alertModChannel(reaction, user, 'add');

    expect(member.send).toHaveBeenCalled();
    expect(modChannel.send).toHaveBeenCalled();
    expect(reaction.users.remove).toHaveBeenCalled();
  });
});
