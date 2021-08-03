import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';
import { updateElement } from '../../../environment';

/**
 * Handles setting of event channel with bot
 */
const handler = async () => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  updateElement('EVENT_QUESTIONS_CHANNEL_ID', client.message.channel.id);

  client.message.channel.send(
    strings.successfullyUpdated('event questions channel', 'the current one')
  );
};

const setDevChannel = {
  example: 'setEventChannel',
  handler,
  usage: 'Sets mod retrieval channel to wherever command is called from.'
};

export default setDevChannel;
