import client from '../../client';

const handler = (args) => {
  const subCmd = args[0];
  if (subCmd === 'list') {
    // TODO: list all pins
    client.logger.debug(subCmd);
  }
};

export default handler;
