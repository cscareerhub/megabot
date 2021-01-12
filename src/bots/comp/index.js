import addSalary from './subCommands/addSalary';
import client from '../../client';
import { commandHandler } from '../../utils';

const subCommands = { add: addSalary };

client.on('salary', () => commandHandler(subCommands));
