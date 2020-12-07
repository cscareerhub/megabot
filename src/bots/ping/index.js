import client from '../../client';

client.on('ping', () => {
  client.message.channel.send('Pong!');
  client.logger.debug('ping reached');
});
