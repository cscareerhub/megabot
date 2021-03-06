import EventModel from '../models/Event';
import client from '../../../client';
import { insufficientPermissionsAlert } from '../../../utils/perms';
import { strings } from '../constants';

/**
 * Handles deleting an event with Event schema
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (insufficientPermissionsAlert()) {
    return;
  }

  if (args.length !== 1) {
    client.message.author.send(strings.insufficientArgumentsDeleteEvent);
    return;
  }

  let deleted;
  let targetId = args[0];

  try {
    deleted = await EventModel.findOneAndDelete({ _id: targetId });
  } catch (error) {
    client.logger.debug('Invalid ObjectId type supplied');
  }

  if (deleted) {
    client.message.channel.send(strings.successfullyDeleted(targetId));
  } else {
    client.message.channel.send(strings.eventNotFound(targetId));
  }
};

const deleteEvent = {
  example: 'delete 5fd3f9a4ea601010fe5875ff',
  handler,
  usage: 'Specify object ID supplied in `++ama list -i`.'
};

export default deleteEvent;
