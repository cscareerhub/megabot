import client from '../../client';
import handlePrivateMessage from './messageHandler';

client.on('mc', handlePrivateMessage);
