import addEvent from './subcommands/addEvent';
import client from '../../client';
import { commandHandler } from '../../utils';
import { getStrings } from './constants';
import listEvents from './subCommands/listEvents';

const subCommands = { add: addEvent, list: listEvents };

client.on('ama', () => commandHandler(subCommands, getStrings()));
