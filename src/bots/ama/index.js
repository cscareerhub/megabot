import addEvent from './subCommands/addEvent';
import client from '../../client';
import { commandHandler } from '../../utils';
import deleteEvent from './subCommands/deleteEvent';
import editEvent from './subCommands/editEvent';
import info from './subCommands/info';
import listEvents from './subCommands/listEvents';
import { strings } from './constants';

const subCommands = {
  add: addEvent,
  delete: deleteEvent,
  edit: editEvent,
  info: info,
  list: listEvents
};

client.on('ama', () => commandHandler(subCommands, strings));
