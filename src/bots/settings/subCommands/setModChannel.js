import client from '../../../client';
import { updateElement } from '../../../environment';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles setting of mod communication channel with bot
 */
const handler = async () => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(
      'You have insufficient permissions to perform this action.'
    );
    return;
  }

  updateElement('MOD_CHANNEL_ID', client.message.channel.id);

  client.message.channel.send('Update mod channel to current one.');
};

const setModChannel = {
  example: 'setChannel',
  handler,
  usage: 'sets mod retrieval channel to wherever command is called from.'
};

export default setModChannel;
