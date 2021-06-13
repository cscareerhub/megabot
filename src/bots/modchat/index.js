import alertModChannel from './reactionHandler';
import client from '../../client';
import handlePrivateMessage from './messageHandler';
import { shouldListen } from '../../utils';

client.on('mc', handlePrivateMessage);

client.on('messageReactionAdd', (reaction, user) => {
  if (shouldListen(reaction.message)) {
    alertModChannel(reaction, user, 'add');
  }
});
