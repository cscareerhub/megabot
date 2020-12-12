import client from '../../client';
import { noArgEmbed } from './constants/embeds';
import { parseCommandString } from '../../utils';

const handler = () => {
  const cmd = parseCommandString();
  const subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.author.send(noArgEmbed);
  }
};

export default handler;
