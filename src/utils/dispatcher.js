import client from '../client';

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

export const dispatchCmd = (command, args) => {
  client.emit(command, args);
};
