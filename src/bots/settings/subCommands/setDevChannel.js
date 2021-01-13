import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { updateElement } from '../../../environment';

/**
 * Handles setting of mod communication channel with bot
 */
const handler = async () => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  updateElement('DEV_CHANNEL_ID', client.message.channel.id);

  client.message.channel.send('Updated dev channel to current one.');
};

const setDevChannel = {
  example: 'setDevChannel',
  handler,
  usage: 'Sets mod retrieval channel to wherever command is called from.'
};

export default setDevChannel;
