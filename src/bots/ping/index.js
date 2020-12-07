import client from '../../client';

client.on('ping', (_, msg) => {
  msg.channel.send('Pong!');
  client.logger.debug('ping reached');
});
