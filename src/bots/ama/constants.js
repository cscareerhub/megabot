import { escapedBackticks } from '../../utils';

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

export const getFormattedEvent = (event) => {
  return `${escapedBackticks}
Event title: ${event.title}
Date: ${event.date.toDateString()}${escapedBackticks}`;
};
