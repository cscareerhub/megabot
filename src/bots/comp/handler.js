import client from '../../client';
import { parseCommandString } from '../../utils';
import { noArgEmbed } from './constants/embeds';

const handler = () => {
  const args = parseCommandString();
  const subCommand = args.subCommand;
  if (!subCommand) {
    client.message.author.send(noArgEmbed);
  }
};

export default handler;
