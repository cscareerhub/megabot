import client from '../../client';
import { getArgs } from '../../utils';
import { noArgEmbed } from './constants/embeds';

const handler = () => {
  const args = getArgs();
  const subCommand = args.subCommand;
  if (!subCommand) {
    client.message.author.send(noArgEmbed);
  }
};

export default handler;
