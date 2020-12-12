import client from '../../client';
import { commandHandler } from '../../utils';
import listPins from './subCommands/listPins';
import pinByReact from './subCommands/pinByReact';

const subCommands = {list: listPins};

client.on('pins', () => commandHandler(subCommands, {}));

client.on('messageReactionAdd', (reaction) => {
  pinByReact(reaction, 'add');
});

client.on('messageReactionRemove', (reaction) => {
  pinByReact(reaction, 'remove');
});
