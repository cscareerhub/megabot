import EventModel from '../models/Event';
import client from '../../../client';
import { strings } from '../constants';
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
  const currentDate = new Date();
  const splitDate = partition(events, (e) => e.date > currentDate);
  let eventString = '';

  if (splitDate[1].length > 0) {
    let allPastEvents = '';
    const pastEventObjects = splitDate[1];

    for (let pastEvent of pastEventObjects) {
      allPastEvents += `${
        showIds ? pastEvent.id + ' ' : ''
      }${pastEvent.date.toDateString()}: ${pastEvent.title}\n`;
    }

    allPastEvents = strings.pastEvents(allPastEvents);

    eventString += allPastEvents + '\n';
  }

  if (splitDate[0].length > 0) {
    const futureEventObjects = splitDate[0];
    const upcomingEventObject = futureEventObjects[0];

    let upcomingEvent = strings.upcomingEvent(
      `${
        showIds ? `${upcomingEventObject.id} ` : ''
      }${upcomingEventObject.date.toDateString()}: ${upcomingEventObject.title}`
    );

    eventString += upcomingEvent + '\n';

    let futureEvents = '';

    for (let i = 1; i < futureEventObjects.length; i++) {
      let next = futureEventObjects[i];

      futureEvents += `${
        showIds ? next.id + ' ' : ''
      }${next.date.toDateString()}: ${next.title}\n`;
    }

    futureEvents = strings.futureEvents(futureEvents);

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
