import EventModel from '../models/Event';
import client from '../../../client';
import { getStrings } from '../constants';
import { parseCommandString } from '../../../utils/index';
import { partition } from '../../../utils/index';

/** Handles finding events in the Event schema and listing them in a message */
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
    let pastEventObjects = splitDate[1];

    for (let s in pastEventObjects) {
      let next = pastEventObjects[s];

      pastEvents += `${
        showIds ? next.id + ' ' : ''
      }${next.date.toDateString()}: ${next.title}\n`;
    }

    pastEvents = getStrings(pastEvents).pastEvents;

    eventString += pastEvents + '\n';
  }

  if (splitDate[0].length > 0) {
    let futureEventObjects = splitDate[0];
    let upcomingEventObject = futureEventObjects[0];

    let upcomingEvent = getStrings(
      `${
        showIds ? upcomingEventObject.id + ' ' : ''
      }${upcomingEventObject.date.toDateString()}: ${upcomingEventObject.title}`
    ).upcomingEvent;

    eventString += upcomingEvent + '\n';

    let futureEvents = '';

    for (let i = 1; i < futureEventObjects.length; i++) {
      let next = futureEventObjects[i];

      futureEvents += `${
        showIds ? next.id + ' ' : ''
      }${next.date.toDateString()}: ${next.title}\n`;
    }

    futureEvents = getStrings(futureEvents).futureEvents;

    if (futureEventObjects.length > 1) {
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
