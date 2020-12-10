import client from '../../client';
import handler from './handler';

client.on('salary', handler);
