import client from '../../client';
import { commandHandler } from '../../utils';
import pm from './subCommands/privateMessage';

const subCommands = {
  pm: pm
};

client.on('misc', () => commandHandler(subCommands));
