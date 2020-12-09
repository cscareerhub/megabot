import client from '../../../client';
import Event from '../models/Event';
import { escapedBackticks } from "../../../utils/embed";

const addEvent = {
  usage: 'Specify date then title of event',
  example: 'add 01/01/2020 Celebrate the best year to date',

  handle: async function(args) {
    if (args.length < 2) {
      client.message.channel.send(
        'Need to supply date (yyyy-mm-dd) and title of event\n' +
        '_Example_: 2020-01-01 start of the greatest year ever');
      return;
    }

    let date = new Date(args[0] + 'T12:00:00Z');

    if (date.toString() === 'Invalid Date') {
      client.message.channel.send('Invalid date provided. Must be in format yyyy-mm-dd');
      return;
    }

    let newEvent = await Event({
      title: args.slice(1).join(' '),
      date: date
    }).save();

    client.message.channel.send('Following event has been created:\n' + getFormattedEvent(newEvent));
  }
}

const getFormattedEvent = (event) => {
  return `${escapedBackticks}
Event title: ${event.title}
Date: ${event.date.toDateString()}${escapedBackticks}`;
}

export default addEvent;
