import { Collection } from 'discord.js';
import * as rawMsgUtils from '../rawMessageProxy';

describe('rawMessageProxy', () => {
  let mockClient = {};

  let message = {
    reactions: {
      cache: {
        get: jest.fn().mockReturnValue({
          users: {
            cache: {
              set: jest.fn()
            }
          }
        })
      }
    }
  };

  let channel = {};

  let packet = {
    d: {
      channel_id: '123',
      emoji: {
        id: '123456',
        name: 'pin'
      },
      message_id: '654321',
      user_id: '654'
    },
    t: 'MESSAGE_REACTION_ADD'
  };

  beforeEach(async () => {
    mockClient = {
      channels: {
        fetch: jest.fn().mockImplementation(() => Promise.resolve(channel))
      },
      emit: jest.fn(),
      messages: {
        cache: new Collection()
      },
      reactions: {
        cache: new Collection()
      },
      users: {
        cache: {
          get: jest.fn().mockImplementation(() => {}),
          set: jest.fn()
        }
      }
    };

    channel = {
      messages: {
        cache: {
          has: jest.fn().mockImplementation(() => false)
        },
        fetch: jest.fn().mockImplementation(() => Promise.resolve(message))
      }
    };
  });

  test('no reaction when packet isn\'t for reactions', async () => {
    let packet = {
      t: 'MESSAGE_CHAT'
    };

    await rawMsgUtils.processRawMessageForReactions(mockClient, packet);

    expect(mockClient.emit).not.toHaveBeenCalled();
  });

  test('no reaction when packet is cached', async () => {
    channel.messages.cache.has = jest.fn().mockReturnValue(true);

    await rawMsgUtils.processRawMessageForReactions(mockClient, packet);

    expect(mockClient.emit).not.toHaveBeenCalled();
  });

  test('reaction sends when all details match', async () => {
    await rawMsgUtils.processRawMessageForReactions(mockClient, packet);

    expect(mockClient.emit).toHaveBeenCalled();
  });
});
