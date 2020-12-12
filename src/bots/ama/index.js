import client from '../../client';
import handler from './handler';
import addEvent from './subcommands/addEvent';
import listEvents from './subcommands/listEvents';

export const subCommands = { add: addEvent, list: listEvents };

client.on('ama', () => handler(subCommands));