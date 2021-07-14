import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';

/**
 * Attempts to private message user on behalf of bot
 *
 * @param {args} args - first arg should be user, second+ message to send
 */
const handler = (args) => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  if (client.message.mentions.users.size == 0) {
    client.message.author.send(strings.userNotSupplied);
    return;
  }

  if (args.length < 2) {
    client.message.author.send(strings.insufficientArguments);
    return;
  }

  let targetUser = client.message.mentions.users.first();

  let messageString = args.slice(1).join(' ');

  targetUser.send(messageString);
  client.message.delete();
};

const pm = {
  example: 'pm @Nik Hello World',
  handler,
  usage: 'Messages user a target message'
};

export default pm;
