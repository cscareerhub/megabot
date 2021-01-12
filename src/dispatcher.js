import client from './client';
import { envs } from './constants';
import { get } from './environment';

/**
 * Receives a message, parses, and emits the appropriate command
 * @param {Object.<string, any>} message - the original message object emitted by a user
 */
export const dispatchCommand = (message) => {
  client.message = message;
  if (message.content.startsWith(client.prefix)) {
    if (get('ENV') === envs.UAT) {
      if (message.channel.id !== get('MOD_CHANNEL_ID')) {
        return;
      }
    }

    const command = message.content
      .substring(client.prefix.length)
      .split(' ')[0];
    if (client.commands.includes(command)) {
      client.emit(command);
    }
  }
};
