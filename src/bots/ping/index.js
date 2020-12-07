import client from '../../client';

client.on('ping', () => {
  client.msg.channel.send('Pong!');
  client.logger.debug('ping reached');
});
