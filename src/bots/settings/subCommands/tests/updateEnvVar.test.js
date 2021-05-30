import client from '../../../../client';
import { defaultStrings } from '../../../../constants';
import { environmentElements } from '../../../../environment';
import { strings } from '../../constants';
import updateEnvVar from '../updateEnvVar';
import * as permUtils from '../../../../utils/perms';

describe('setting environment variable change', () => {
  beforeEach(async () => {
    client.message = {
      author: {
        send: jest.fn()
      },

      channel: {
        id: 12321,
        send: jest.fn()
      }
    };
  });

  test('settings returns error message when insufficient permissions', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        client.message.author.send(defaultStrings.insufficientPermissions);
        return true;
      });

    await updateEnvVar.handler([]);

    expect(client.message.author.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );

    expect(client.message.channel.send).not.toHaveBeenCalled();
  });

  test('settings returns error message when insufficient arguments', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        return false;
      });

    await updateEnvVar.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.insufficientArguments
    );
  });

  test('settings returns error message when invalid variable being set', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        return false;
      });

    await updateEnvVar.handler(['TEST_TOKEN', 'IDKLOL']);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.variableNotFound(environmentElements.join(', '))
    );
  });

  test('settings updates command prefix', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        return false;
      });

    await updateEnvVar.handler(['BOT_PREFIX', '-+-']);

    expect(process.env['BOT_PREFIX']).toEqual('-+-');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.successfullyUpdated('BOT_PREFIX', '-+-')
    );
  });
});
