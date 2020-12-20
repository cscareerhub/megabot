import client from '../../client';
import { commandHandler } from '../../utils';
import setModChannel from './subCommands/setModChannel';
import updateElement from './subCommands/updateEnvVar';

const subCommands = { setChannel: setModChannel, update: updateElement };

client.on('settings', () => commandHandler(subCommands, {}));
