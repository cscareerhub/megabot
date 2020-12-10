import client from './client';

export const dispatchCommand = (message) => {
  client.message = message;
  if (message.content.startsWith(client.prefix)) {
    const command = message.content.substring(2).split(' ')[0];
    if (client.commands.includes(command)) {
      client.emit(command);
    }
  }
};
