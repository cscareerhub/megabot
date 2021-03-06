import { dedent, escapedBackticks } from '../../utils';

/**
 * String object with functions that return strings with args
 */
export const strings = {
  createdEvent: (arg) => `The following event has been created:\n${arg}`,
  editEventExample: (arg) =>
    `Split your event's properties by using a double newline. _Example_:\n${arg}`,
  eventNotFound: (arg) => `Event with id \`${arg}\` not found.`,
  futureEvents: (arg) => `__**Future Events**__\n${arg}`,
  insufficientArgumentsAddEvent:
    'Please supply a date in the format `yyyy-mm-dd` and an event title.\n_Example_: ++ama add 2020-01-01 start of the greatest year ever',
  insufficientArgumentsDeleteEvent: 'Please supply an event ID.',
  invalidDateAddEvent: 'Invalid date provided. Must be in format `yyyy-mm-dd`.',
  noEvents: 'No events yet. :(',
  noUpcomingEvents: 'No upcoming events found. :(',
  pastEvents: (arg) => `__**Past Events**__\n${arg}`,
  successfullyDeleted: (arg) => `Event with id ${arg} successfully deleted.`,
  upcomingEvent: (arg) => `__**Upcoming Event**__\n${arg}\n`
};

/**
 * Possible edit fields
 */
export const possibleEditFields = dedent(
  `++ama edit 5fd3f9a4ea601010fe5875ff
  ${escapedBackticks}url: https://cscareerhub.com

  date: 2020-12-25

  description: Line 1
  Line 2

  title: Sample Event

  participants: Kevin, Kevin Jr${escapedBackticks}`
);

/**
 * Formats event string
 * @param {Object.<string, any>} event - event to be formatted
 * @param {boolean} addDetails - setting to true will print details beyond title and date
 * @returns {string} - formatted event string
 */
export const getFormattedEvent = (event, addDetails) => {
  let details = dedent(
    `${escapedBackticks}
    Event title: ${event.title}
    Date: ${event.date.toDateString()}`
  );

  if (addDetails) {
    details += dedent(`
      URL: ${event.url || ''}
      Participant(s): ${event.participants?.join(', ') || ''}
      Description: ${event.description || ''}`);
  }

  details += escapedBackticks;

  return details;
};
