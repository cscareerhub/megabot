import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';

const baseUrl = 'https://lmgtfy.app/?q=';

/**
 * Sends lmgtfy link for requested params
 * 
 * @param {Array[String]} args - the query for lmgtfy
 * @returns lmgtfy link as string
 */
const handler = (args) => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  if (args.length < 1) {
    client.message.author.send(strings.insufficientArguments);
    return;
  }

  for (let i = 0; i < args.length; i++) {
    args[i] = encodeURIComponent(args[i]);
  }

  var url = baseUrl + args.join('+');

  client.message.channel.send(url);
};

const lmgtfy = {
  example: 'lmgtfy Hello World',
  handler,
  usage: 'creates a lmgtfy link for query'
};

export default lmgtfy;
