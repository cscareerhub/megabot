import client from '../../../../client';
import pm from '../privateMessage';
import { strings } from '../../constants';
import * as permUtils from '../../../../utils/perms';

describe('handlePrivateMessage', () => {
  let recipient = {
    send: jest.fn()
  };

  beforeEach(() => {
    client.message = {
      author: {
        discriminator: 1234,
        send: jest.fn(),
        username: 'test-user'
      },
      channel: {
        send: jest.fn()
      },
      delete: jest.fn(),
      mentions: {
        users: {
          first: () => recipient,
          size: 1
        }
      }
    };

    client.prefix = '++';
  });

  test('when user has insufficient permissions', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => true);

    pm.handler(['Nik', 'Hello', 'World.', '1234']);

    expect(client.message.author.send).not.toHaveBeenCalled();
  });

  test('when user does not provide a recipient', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => false);
    client.message.mentions.users.size = 0;

    pm.handler(['Nik', 'Hello', 'World.', '1234']);

    expect(client.message.author.send).toHaveBeenCalledWith(
      strings.userNotSupplied
    );
    expect(recipient.send).not.toHaveBeenCalled();
  });

  test('when user does not provide a message', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => false);

    pm.handler(['Nik']);

    expect(client.message.author.send).toHaveBeenCalledWith(
      strings.insufficientArguments
    );
    expect(recipient.send).not.toHaveBeenCalled();
  });

  test('when all is correct', () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => false);

    pm.handler(['Nik', 'Hello', 'World.', '1234']);

    expect(client.message.author.send).not.toHaveBeenCalled();
    expect(recipient.send).toHaveBeenCalledWith('Hello World. 1234');
  });
});
