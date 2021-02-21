import client from '../../client';
import { commandHandler } from '../../utils';
import setDevChannel from './subCommands/setDevChannel';
import setModChannel from './subCommands/setModChannel';
import updateElement from './subCommands/updateEnvVar';

const subCommands = {
  setDevChannel: setDevChannel,
  setModChannel: setModChannel,
  update: updateElement
};

client.on('settings', () => commandHandler(subCommands));
