import addSalary from './subCommands/addSalary';
import client from '../../client';
import { commandHandler } from '../../utils';
import { strings } from './constants/strings';

const subCommands = { add: addSalary };

client.on('salary', () => commandHandler(subCommands, strings));
