import client from '../../client';

const handler = (args, msg) => {
  const subCmd = args[0];
  // Will we do something with the subcommand?

  msg.channel.send('Pong!');
  client.logger.debug('ping reached');
};

export default handler;
