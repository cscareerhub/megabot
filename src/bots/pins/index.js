import client from '../../client';
import { commandHandler } from '../../utils';
import listPins from './subCommands/listPins';
import pinByReact from './subCommands/pinByReact';
import { getMemberFromUser, isContributor, isMod } from '../../utils/perms';

const subCommands = { list: listPins };

client.on('pins', () => commandHandler(subCommands, {}));

client.on('messageReactionAdd', async (reaction) => {
  reaction.users.cache.each(async (user) => {
    const member = await getMemberFromUser(user);
    if (isContributor(member) || isMod(member)) {
      pinByReact(reaction, 'add');
    } else {
      reaction.message.channel.send(
        'You do not have permission to pin this message.'
      );
    }
  });
});

client.on('messageReactionRemove', (reaction) => {
  pinByReact(reaction, 'remove');
});
