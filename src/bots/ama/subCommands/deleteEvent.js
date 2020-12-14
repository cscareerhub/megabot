import EventModel from '../models/Event';
import client from '../../../client';
import { getStrings } from '../constants';

/**
 * Handles deleting an event with Event schema
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (args.length != 1) {
    client.message.channel.send(getStrings().insufficientArgumentsEvent);
    return;
  }

  let deleted;

  try {
    deleted = await EventModel.findOneAndDelete({ _id: args[0] });
  } catch (_) {
    client.logger.debug('invalid ObjectId type supplied');
  }

  if (deleted) {
    client.message.channel.send(getStrings(args[0]).successfullyDeleted);
  } else {
    client.message.channel.send(getStrings(args[0]).eventNotFound);
  }
};

const deleteEvent = {
  example: 'delete 5fd3f9a4ea601010fe5875ff',
  handler,
  usage: 'Specify object ID supplied in `++ama list -i`'
};

export default deleteEvent;
