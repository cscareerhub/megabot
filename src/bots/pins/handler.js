import client from '../../client';
import { getArgs } from '../../utils';

const handler = () => {
  const args = getArgs();
  const subCommand = args.subCommand;

  if (subCommand === 'list') {
    // TODO: list all pins
    client.logger.debug(subCommand);
  }
};

export default handler;
