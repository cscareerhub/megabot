import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';
import { getElementsForChannelId, updateElement } from '../../../environment';

/**
 * Purges current channel user is in and recreates a clone.
 * This is done in settings as it needs env access.
 */
const handler = async (args) => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  let newChannel = await client.message.channel.clone();

  if (newChannel === null) {
    client.message.channel.send(strings.channelNotCreated);
    return;
  }

  let ids = getElementsForChannelId(client.message.channel.id);

  for (let channelId of ids) {
    updateElement(channelId, newChannel.id);
  }

  if (args.length > 0) {
    if (args[0].toUpperCase() === 'DELETE') {
      await client.message.channel.delete();
    } else {
      await client.message.channel.updateOverwrite(
        client.message.guild.roles.everyone,
        { SEND_MESSAGES: false }
      );
    }
  }

  newChannel.send(strings.channelCreated(client.message.author.toString()));
};

const purge = {
  example: 'purge [delete|lock]',
  handler,
  usage: 'purges current channel (sets env var if needed)'
};

export default purge;
