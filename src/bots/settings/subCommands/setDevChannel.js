import client from '../../../client';
import { defaultStrings } from '../../../constants';
import { updateElement } from '../../../environment';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles setting of mod communication channel with bot
 */
const handler = async () => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(defaultStrings.insufficientPermissions);
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
