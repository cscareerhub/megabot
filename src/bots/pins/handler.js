import client from '../../client';

const handler = (subCmd) => {
  if (subCmd === 'list') {
    // TODO: list all pins
    client.logger.debug(subCmd);
  }
};

export default handler;
