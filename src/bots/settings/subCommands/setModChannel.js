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

  updateElement('MOD_CHANNEL_ID', client.message.channel.id);

  client.message.channel.send('Updated mod channel to current one.');
};

const setModChannel = {
  example: 'setModChannel',
  handler,
  usage: 'Sets mod retrieval channel to wherever command is called from.'
};

export default setModChannel;
