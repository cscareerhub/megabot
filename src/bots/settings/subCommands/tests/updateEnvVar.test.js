import client from '../../../../client';
import { defaultStrings } from '../../../../constants';
import { environmentElements } from '../../../../environment';
import { strings } from '../../constants';
import updateEnvVar from '../updateEnvVar';
import * as permUtils from '../../../../utils/perms';

describe('setting environment variable change', () => {
  beforeEach(async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementation(() => true);

    client.message = {
      channel: {
        id: 12321,
        send: jest.fn()
      }
    };
  });

  test('settings returns error message when insufficient permissions', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);

    await updateEnvVar.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );
  });

  test('settings returns error message when insufficient arguments', async () => {
    await updateEnvVar.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.insufficientArguments
    );
  });

  test('settings returns error message when invalid variable being set', async () => {
    await updateEnvVar.handler(['TEST_TOKEN', 'IDKLOL']);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.variableNotFound(environmentElements.join(', '))
    );
  });

  test('settings updates command prefix', async () => {
    await updateEnvVar.handler(['BOT_PREFIX', '-+-']);

    expect(process.env['BOT_PREFIX']).toEqual('-+-');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.successfullyUpdated('BOT_PREFIX', '-+-')
    );
  });
});
