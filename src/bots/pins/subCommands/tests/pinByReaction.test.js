import { defaultStrings } from '../../../../constants';
import pinByReaction from '../pinByReaction';
import * as permUtils from '../../../../utils/perms';

describe('pinByReaction', () => {
  const reaction = {
    emoji: { name: '📌' },
    message: {
      channel: { send: jest.fn() },
      pin: jest.fn().mockImplementation(() => {
        return {
          then: jest.fn().mockImplementation(() => {
            return { catch: jest.fn() };
          })
        };
      }),
      unpin: jest.fn().mockImplementation(() => {
        return {
          then: jest.fn().mockImplementation(() => {
            return { catch: jest.fn() };
          })
        };
      })
    }
  };

  jest.spyOn(permUtils, 'getMemberFromUser').mockImplementation(() => {
    return {};
  });

  test('messages when user has no permission', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => false);
    const user = {};
    const action = 'add';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );
  });

  test('does not message when user has permission', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => true);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => true);
    const user = {};
    const action = 'add';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.channel.send).not.toHaveBeenCalled();
  });

  test('does not message when user has Contributor role but not Mod role', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => true);
    const user = {};
    const action = 'add';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.channel.send).not.toHaveBeenCalled();
  });

  test('does not message when user has Mod role but not Contributor role', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => true);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => false);
    const user = {};
    const action = 'add';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.channel.send).not.toHaveBeenCalled();
  });

  test('calls pin when add action is passed', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => true);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => true);
    const user = {};
    const action = 'add';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.pin).toHaveBeenCalled();
  });

  test('calls unpin when remove action is passed', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => true);
    jest.spyOn(permUtils, 'isContributor').mockImplementationOnce(() => true);
    const user = {};
    const action = 'remove';
    await pinByReaction(reaction, user, action);

    expect(reaction.message.unpin).toHaveBeenCalled();
  });
});
