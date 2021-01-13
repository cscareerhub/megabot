import client from '../../client';
import { commandHandler } from '../../utils';
import listPins from './subCommands/listPins';
import pinByReaction from './subCommands/pinByReaction';

const subCommands = { list: listPins };

client.on('pins', () => commandHandler(subCommands, {}));

client.on('messageReactionAdd', async (reaction, user) => {
  pinByReaction(reaction, user, 'add');
});

client.on('messageReactionRemove', (reaction, user) => {
  pinByReaction(reaction, user, 'remove');
});
