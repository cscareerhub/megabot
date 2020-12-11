import Event from '../models/Event';
import client from '../../../client';
import { getFormattedEvent, getStrings } from '../constants';

const addEvent = {
  example: 'add 01/01/2020 Celebrate the best year to date',
  handler,
  usage: 'Specify date then title of event'
};

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

export default addEvent;
