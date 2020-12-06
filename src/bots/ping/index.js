import client from '../../client';
import handler from './handler';

client.on('ping', (args, msg) => handler(args, msg));
