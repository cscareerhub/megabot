import client from '../../client';
import { commandHandler } from '../../utils';
import purge from './subCommands/purgeChannel';
import setDevChannel from './subCommands/setDevChannel';
import setEventChannel from './subCommands/setEventChannel';
import setModChannel from './subCommands/setModChannel';
import updateElement from './subCommands/updateEnvVar';

const subCommands = {
  purge: purge,
  setDevChannel: setDevChannel,
  setEventChannel: setEventChannel,
  setModChannel: setModChannel,
  update: updateElement
};

client.on('settings', () => commandHandler(subCommands));
