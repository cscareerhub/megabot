import client from '../../client';

const handler = (_, msg) => {
  msg.channel.send('Pong!');
  client.logger.debug('ping reached');
};

export default handler;
