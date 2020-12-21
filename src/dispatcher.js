import client from './client';

/**
 * Receives a message, parses, and emits the appropriate command
 * @param {Object.<string, any>} message - the original message object emitted by a user
 */
export const dispatchCommand = (message) => {
  client.message = message;
  if (message.content.startsWith(client.prefix)) {
    const command = message.content
      .substring(client.prefix.length)
      .split(' ')[0];
    if (client.commands.includes(command)) {
      client.emit(command);
    }
  }
};
