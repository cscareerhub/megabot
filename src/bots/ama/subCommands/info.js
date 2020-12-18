import EventModel from '../models/Event';
import client from '../../../client';
import { getFormattedEvent } from '../constants';

/** Handles finding events in the Event schema and listing them in a message */
const handler = async () => {
  let today = new Date();
  let event = await EventModel.findOne({
    date: {
      $gte: today
    }
  }).sort('date');

  if (event) {
    await client.message.author.send(getFormattedEvent(event, true));
  } else {
    await client.message.author.send('No upcoming events found :(');
  }
};

const info = {
  example: 'info',
  handler,
  usage: 'Messages user information about upcoming AMA'
};

export default info;
