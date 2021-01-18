import client from '../../../client';
import { defaultStrings } from '../../../constants';
import { strings } from '../constants';
import { environmentElements, get, updateElement } from '../../../environment';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles updating environment variables and client prefix.
 * @param {Array.<string>} args - size 2 length array corresponding to [variable name, new variable value]
 */
const handler = async (args) => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(defaultStrings.insufficientPermissions);
    return;
  }

  if (args.length < 2) {
    client.message.channel.send(strings.insufficientArguments);
    return;
  }

  if (!updateElement(args[0], args[1])) {
    client.message.channel.send(
      strings.variableNotFound(environmentElements.join(', '))
    );
    return;
  }

  client.message.channel.send(strings.successfullyUpdated(args[0], args[1]));
  client.prefix = get('BOT_PREFIX');
};

const updateEnvVar = {
  example: 'update VAR_NAME <new value>',
  handler,
  usage:
    'Updates environment variable and refreshes env to take it. Note: does not refresh DB connection with new details.'
};

export default updateEnvVar;
