import { dedent, escapedBackticks } from '../../utils';

/**
 * Contructs string object with options
 * @param  {...any} options - data for strings and other options
 * @return {Object.<string, string>} - string object with all AMA bot strings
 */
export const getStrings = (...options) => {
  options = options || [{}];
  return {
    createdEvent: `Following event has been created:\n${options[0]}`,
    editEventExample: `Surround values with triple backticks and split by double newline. For example:\n${options[0]}`,
    eventNotFound: `Event with id ${options[0]} not found`,
    futureEvents: `__**Future Events**__\n${options[0]}`,
    insufficientArgumentsAddEvent:
      'Need to supply date (yyyy-mm-dd) and title of event\n_Example_: 2020-01-01 start of the greatest year ever',
    insufficientArgumentsEvent: 'Need to supply event ID',
    invalidDateAddEvent: 'Invalid date provided. Must be in format yyyy-mm-dd',
    noBackticks: 'Must surround data with backticks (codeblock)',
    noEvents: 'No events yet :(',
    pastEvents: `__**Past Events**__\n${options[0]}`,
    successfullyDeleted: `Event with id ${options[0]} successfully deleted`,
    upcomingEvent: `__**Upcoming Event**__\n${options[0]}\n`
  };
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
