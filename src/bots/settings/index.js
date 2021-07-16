import client from '../../client';
import { commandHandler } from '../../utils';
import purge from './subCommands/purgeChannel';
import setDevChannel from './subCommands/setDevChannel';
import setModChannel from './subCommands/setModChannel';
import updateElement from './subCommands/updateEnvVar';

const subCommands = {
  purge: purge,
  setDevChannel: setDevChannel,
  setModChannel: setModChannel,
  update: updateElement
};

client.on('settings', () => commandHandler(subCommands));
