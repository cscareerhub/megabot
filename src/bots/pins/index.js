import client from '../../client';
import { commandHandler } from '../../utils';
import { envs } from '../../constants';
import { get } from '../../environment';
import listPins from './subCommands/listPins';
import pinByReaction from './subCommands/pinByReaction';

const subCommands = { list: listPins };

client.on('pins', () => commandHandler(subCommands, {}));

client.on('messageReactionAdd', async (reaction, user) => {
  if (get('ENV') === envs.UAT) {
    if (reaction.message.channel.id !== get('MOD_CHANNEL_ID')) {
      return;
    }
  }

  pinByReaction(reaction, user, 'add');
});

client.on('messageReactionRemove', (reaction, user) => {
  if (get('ENV') === envs.UAT) {
    if (reaction.message.channel.id !== get('MOD_CHANNEL_ID')) {
      return;
    }
  }

  pinByReaction(reaction, user, 'remove');
});
