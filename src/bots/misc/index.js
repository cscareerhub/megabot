import client from '../../client';
import { commandHandler } from '../../utils';
import lmgtfy from './subCommands/lmgtfy';
import pm from './subCommands/privateMessage';

const subCommands = {
  lmgtfy: lmgtfy,
  pm: pm
};

client.on('misc', () => commandHandler(subCommands));
