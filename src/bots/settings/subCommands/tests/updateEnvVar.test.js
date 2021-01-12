import client from '../../../../client';
import { environmentElements } from '../../../../environment';
import updateEnvVar from '../updateEnvVar';
import * as permUtils from '../../../../utils/perms';

describe('setting environment variable change', () => {
  test('settings returns error message when insufficient permissions', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);

    await updateEnvVar.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You have insufficient permissions to perform this action.'
    );
  });

  test('settings returns error message when insufficient arguments', async () => {
    await updateEnvVar.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You need to supply variable name and new value.'
    );
  });

  test('settings returns error message when invalid variable being set', async () => {
    await updateEnvVar.handler(['TEST_TOKEN', 'IDKLOL']);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      `Variable not found. Available options: ${environmentElements.join(', ')}`
    );
  });

  test('settings updates command prefix', async () => {
    await updateEnvVar.handler(['BOT_PREFIX', '-+-']);

    expect(process.env['BOT_PREFIX']).toEqual('-+-');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Updated PREFIX to -+-'
    );
  });

  beforeEach(async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementation(() => true);

    client.message = {
      channel: {
        id: 12321,
        send: jest.fn()
      }
    };
  });
});
