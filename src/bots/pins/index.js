import client from '../../client';
import { commandHandler } from '../../utils';
import listPins from './subCommands/listPins';
import pinByReaction from './subCommands/pinByReaction';

const subCommands = { list: listPins };

client.on('pins', () => commandHandler(subCommands, {}));

client.on('messageReactionAdd', async (reaction) => {
  pinByReaction(reaction, 'add');
});

client.on('messageReactionRemove', (reaction) => {
  pinByReaction(reaction, 'remove');
});
