import client from '../../client';

const handler = (_, msg) => {
  msg.channel.send('Pong!');
};

export default handler;
