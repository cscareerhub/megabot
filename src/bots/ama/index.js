import addEvent from './subCommands/addEvent';
import client from '../../client';
import { commandHandler } from '../../utils';
import deleteEvent from './subCommands/deleteEvent';
import editEvent from './subCommands/editEvent';
import { getStrings } from './constants';
import listEvents from './subCommands/listEvents';

const subCommands = {
  add: addEvent,
  delete: deleteEvent,
  edit: editEvent,
  list: listEvents
};

client.on('ama', () => commandHandler(subCommands, getStrings()));
