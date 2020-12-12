import client from '../../client';
import handler from './handler';
import addEvent from './subCommands/addEvent';
import listEvents from './subCommands/listEvents';

export const subCommands = { add: addEvent, list: listEvents };

client.on('ama', () => handler(subCommands));