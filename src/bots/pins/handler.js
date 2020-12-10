import client from '../../client';
import { parseCommandString } from '../../utils';

const handler = () => {
  const args = parseCommandString();
  const subCommand = args.subCommand;

  if (subCommand === 'list') {
    // TODO: list all pins
    client.logger.debug(subCommand);
  }
};

export default handler;
