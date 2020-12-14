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
    futureEvents: `__**Future Events**__\n${options[0]}`,
    insufficientArgumentsAddEvent:
      'Need to supply date (yyyy-mm-dd) and title of event\n_Example_: 2020-01-01 start of the greatest year ever',
    invalidDateAddEvent: 'Invalid date provided. Must be in format yyyy-mm-dd',
    noEvents: 'No events yet :(',
    pastEvents: `__**Past Events**__\n${options[0]}`,
    upcomingEvent: `__**Upcoming Event**__\n${options[0]}\n`
  };
};

/**
 * Formats event string
 * @param {Object.<string, any>} event - event to be formatted
 * @returns {string} - formatted event string
 */
export const getFormattedEvent = (event) => {
  return dedent(`${escapedBackticks}
    Event title: ${event.title}
    Date: ${event.date.toDateString()}${escapedBackticks}`);
};
