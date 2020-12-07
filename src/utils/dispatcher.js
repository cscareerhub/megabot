import client from '../client';

export const parseMessage = (msg) => {
  client.msg = msg;
  const msgText = msg.toString();
  if (msgText.substring(0, 2) === client.prefix) {
    const args = msgText.substring(2).split(' ');
    const cmd = args[0];
    if (client.commands.includes(cmd)) {
      client.emit('command', cmd, args.splice(1));
    }
  }
};

export const dispatchCmd = (cmd, args) => {
  client.emit(cmd, args);
};
