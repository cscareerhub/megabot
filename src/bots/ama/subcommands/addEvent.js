import client from '../../../client';
import Event from '../models/Event';
import { getFormattedEvent, getStrings } from '../constants'

const addEvent = {
  usage: 'Specify date then title of event',
  example: 'add 01/01/2020 Celebrate the best year to date',

  handle: async function(args) {
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
      title: args.slice(1).join(' '),
      date: date
    }).save();

    client.message.channel.send(getStrings(getFormattedEvent(newEvent)).createdEvent);
  }
}

export default addEvent;
