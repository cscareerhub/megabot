import EventModel from '../models/Event';
import client from '../../../client';
import { getStrings } from '../constants';
import { partition } from '../../../utils/index';

const handler = async () => {
  let events = await EventModel.find({}).sort({ date: 'asc' });

  if (events.length === 0) {
    await client.message.channel.send(getStrings().noEvents);
  } else {
    client.message.channel.send(formatEvents(events));
  }
};

const formatEvents = (events) => {
  let currentDate = new Date();
  let splitDate = partition(events, (e) => e.date > currentDate);

  let upcomingEvent = getStrings(
    `${splitDate[0][0].date.toDateString()}: ${splitDate[0][0].title}`
  ).upcomingEvent;

  let futureEvents = '';

  for (let i = 1; i < splitDate[0].length; i++) {
    let next = splitDate[0][i];

    futureEvents += `${next.date.toDateString()}: ${next.title}\n`;
  }

  futureEvents = getStrings(futureEvents).futureEvents;

  let pastEvents = '';

  for (let s in splitDate[1]) {
    let next = splitDate[1][s];

    pastEvents += `${next.date.toDateString()}: ${next.title}\n`;
  }

  pastEvents = getStrings(pastEvents).pastEvents;

  return `${pastEvents}
${upcomingEvent}
${futureEvents}`;
};

const listEvents = {
  example: 'list',
  handler,
  usage: 'List all events'
};

export default listEvents;
