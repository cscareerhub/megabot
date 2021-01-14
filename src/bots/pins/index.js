import client from '../../client';
import listPins from './subCommands/listPins';
import pinByReaction from './subCommands/pinByReaction';
import { commandHandler, shouldListen } from '../../utils';

const subCommands = { list: listPins };

client.on('pins', () => commandHandler(subCommands));

client.on('messageReactionAdd', (reaction, user) => {
  if (shouldListen(reaction.message)) {
    pinByReaction(reaction, user, 'add');
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  if (shouldListen(reaction.message)) {
    pinByReaction(reaction, user, 'remove');
  }
});
