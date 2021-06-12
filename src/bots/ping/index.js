import client from '../../client';
import { version } from '../../../package.json';

client.on('ping', () => {
  client.logger.debug('ping reached');

  client.message.channel.send('Pong! Megabot version: ' + version);
});
