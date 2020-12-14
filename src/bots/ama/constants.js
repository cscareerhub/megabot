import { escapedBackticks } from '../../utils';

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
    invalidSubCommand: 'Invalid argument. Following arguments are permitted:',
    noEvents: 'No events yet :(',
    pastEvents: `__**Past Events**__\n${options[0]}`,
    successfullyDeleted: `Event with id ${options[0]} successfully deleted`,
    upcomingEvent: `__**Upcoming Event**__\n${options[0]}\n`
  };
};

export const getFormattedEvent = (event, addDetails) => {
  let details = `${escapedBackticks}
Event title: ${event.title}
Date: ${event.date.toDateString()}`;

  if (addDetails) {
    details += `
URL: ${event.url || ''}
Participant(s): ${event.participants?.join(', ') || ''}
Description: ${event.description || ''}`;
  }

  details += escapedBackticks;

  return details;
};
