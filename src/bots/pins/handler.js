import client from '../../client';

const handler = (args) => {
  const subCommand = args[0];
  if (subCommand === 'list') {
    // TODO: list all pins
    client.logger.debug(subCommand);
  }
};

export default handler;
