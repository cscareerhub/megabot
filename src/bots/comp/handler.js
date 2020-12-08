import client from '../../client';
import embed from './embed';
import { getArgs } from '../../utils';

const handler = () => {
  const args = getArgs();
  const subCommand = args.subCommand;
  if (!subCommand) {
    client.message.author.send(embed);
  }
};

export default handler;
