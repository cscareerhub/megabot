import client from '../../../client';
import Event from '../models/Event';

const addEvent = {
  usage: 'Specify date then title of event',
  example: 'add 01/01/2020 Celebrate the best year to date',

  handle: (args) => {
    if (args.length < 2) {
      client.message.channel.send(
        'Need to supply date (yyyy-mm-dd) and title of event\n' +
        '_Example_: 2020-01-01 start of the greatest year ever');
      return;
    }

    let date = new Date(args[0] + 'T12:00:00Z');

    if (date.toString() === 'Invalid Date') {
      client.message.channel.send('Invalid date provided. Must be in format yyy-mm-dd');
      return;
    }

    let newEvent = Event({
      title: args.slice(1).join(' '),
      date: date
    }).save();

    newEvent.then(e => client.message.channel.send('Following event has been created:\n' + getFormattedEvent(e)));
  }
}

const getFormattedEvent = (event) => {
  let str = '```';

  str += '\nEvent title: ' + event.title;
  str += '\nDate: ' + event.date.toDateString();

  str += '\n```';

  return str;
}

export default addEvent;