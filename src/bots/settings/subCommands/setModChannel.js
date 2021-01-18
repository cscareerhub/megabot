import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';
import { updateElement } from '../../../environment';

/**
 * Handles setting of mod communication channel with bot
 */
const handler = async () => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  updateElement('MOD_CHANNEL_ID', client.message.channel.id);

  client.message.channel.send(
    strings.successfullyUpdated('mod channel', 'the current one')
  );
};

const setModChannel = {
  example: 'setModChannel',
  handler,
  usage: 'Sets mod retrieval channel to wherever command is called from.'
};

export default setModChannel;
