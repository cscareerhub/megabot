import client from '../../client';
import { noArgEmbed } from './constants/embeds';
import { parseCommandString } from '../../utils';

const handler = () => {
  const args = parseCommandString();
  const subCommand = args.subCommand;
  if (!subCommand) {
    client.message.author.send(noArgEmbed);
  }
};

export default handler;
