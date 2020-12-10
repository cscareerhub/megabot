import client from '../client';

/**
 * Parse message into its component args and emits back to the client
 * @param {Object} message - the original message object emitted by a user
 */
export const parseMessage = (message) => {
  client.message = message;
  const messageText = message.toString();
  if (messageText.substring(0, 2) === client.prefix) {
    const args = messageText.substring(2).split(' ');
    const command = args[0];
    if (client.commands.includes(command)) {
      client.emit('command', command, args.splice(1));
    }
  }
};

/**
 * Emits a command and list of arguments
 * @param {string} command - the parsed command sent by user
 * @param {Array} args - all strings that followed the parsed command
 */
export const dispatchCmd = (command, args) => {
  client.emit(command, args);
};
