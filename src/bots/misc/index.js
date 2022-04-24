import client from '../../client';
import { commandHandler } from '../../utils';
import lmgtfy from './subCommands/lmgtfy';
import onEventQuestion from './events/onMessage';
import pm from './subCommands/privateMessage';

const subCommands = {
  lmgtfy: lmgtfy,
  pm: pm
};

client.on('misc', () => commandHandler(subCommands));

client.on('messageCreate', (message) => {
  //Don't upvote commands
  if (message.content.startsWith(client.prefix)) {
    return;
  }

  onEventQuestion(message);
});
