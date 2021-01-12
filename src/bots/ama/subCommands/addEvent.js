import Event from '../models/Event';
import client from '../../../client';
import { getFormattedEvent, strings } from '../constants';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles adding an event to Event schema and sends message with new event
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(strings.insufficientPermissions);
    return;
  }

  if (args.length < 2) {
    client.message.channel.send(strings.insufficientArgumentsAddEvent);
    return;
  }

  let date = new Date(args[0] + 'T12:00:00Z');

  if (date.toString() === 'Invalid Date') {
    client.message.channel.send(strings.invalidDateAddEvent);
    return;
  }

  let newEvent = await Event({
    date: date,
    title: args.slice(1).join(' ')
  }).save();

  client.message.channel.send(
    strings.createdEvent(getFormattedEvent(newEvent))
  );
};

const addEvent = {
  example: 'add 2020-01-01 Celebrate the best year to date',
  handler,
  usage: 'Adds new event. Specify date then title of event'
};

export default addEvent;
