import Event from '../models/Event';
import client from '../../../client';
import { getFormattedEvent, getStrings } from '../constants';

/**
 * Handles adding an event to Event schema and sends message with new event
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (args.length < 2) {
    client.message.channel.send(getStrings().insufficientArgumentsAddEvent);
    return;
  }

  let date = new Date(args[0] + 'T12:00:00Z');

  if (date.toString() === 'Invalid Date') {
    client.message.channel.send(getStrings().invalidDateAddEvent);
    return;
  }

  let newEvent = await Event({
    date: date,
    title: args.slice(1).join(' ')
  }).save();

  client.message.channel.send(
    getStrings(getFormattedEvent(newEvent)).createdEvent
  );
};

const addEvent = {
  example: 'add 01/01/2020 Celebrate the best year to date',
  handler,
  usage: 'Specify date then title of event'
};

export default addEvent;
