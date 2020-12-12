import EventModel from '../models/Event';
import client from '../../../client';
import { getStrings } from '../constants';
import { parseCommandString } from '../../../utils/index';
import { partition } from '../../../utils/index';

const handler = async () => {
  let events = await EventModel.find({}).sort({ date: 'asc' });

  if (events.length === 0) {
    await client.message.channel.send(getStrings().noEvents);
  } else {
    let parsedCmd = parseCommandString();

    client.message.channel.send(
      formatEvents(events, parsedCmd.arguments.length > 0)
    );
  }
};

/**
 * Formats events into a readable string
 * @param {Array.<Object.<string, any>>} events - list of event objects
 * @param {boolean} showIds - trigger that shows event Database IDs if set to true
 * @returns {string} - message string with all events
 */
const formatEvents = (events, showIds) => {
  let currentDate = new Date();
  let splitDate = partition(events, (e) => e.date > currentDate);
  let eventString = '';

  if (splitDate[1].length > 0) {
    let pastEvents = '';

    for (let s in splitDate[1]) {
      let next = splitDate[1][s];

      pastEvents += `${
        showIds ? next.id + ' ' : ''
      }${next.date.toDateString()}: ${next.title}\n`;
    }

    pastEvents = getStrings(pastEvents).pastEvents;

    eventString += pastEvents + '\n';
  }

  if (splitDate[0].length > 0) {
    let upcomingEvent = getStrings(
      `${
        showIds ? splitDate[0][0].id + ' ' : ''
      }${splitDate[0][0].date.toDateString()}: ${splitDate[0][0].title}`
    ).upcomingEvent;

    eventString += upcomingEvent + '\n';

    let futureEvents = '';

    for (let i = 1; i < splitDate[0].length; i++) {
      let next = splitDate[0][i];

      futureEvents += `${
        showIds ? next.id + ' ' : ''
      }${next.date.toDateString()}: ${next.title}\n`;
    }

    futureEvents = getStrings(futureEvents).futureEvents;

    if (splitDate[0].length > 1) {
      eventString += futureEvents + '\n';
    }
  }

  return eventString;
};

const listEvents = {
  example: 'list [-i]',
  handler,
  usage: 'List all events. Add -i flag to see event IDs.'
};

export default listEvents;
