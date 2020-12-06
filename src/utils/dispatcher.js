import client from '../client';
import { prefix, validCmds } from '../constants';

export const parseMessage = (msg) => {
  msg = msg.toString();
  if (msg.substring(0, 2) === prefix) {
    const args = msg.substring(2).split(' ');
    const cmd = args[0];
    if (validCmds.includes(cmd)) {
      client.emit('command', cmd, args.splice(1));
    }
  }
};

export const dispatchCmd = (cmd, args) => {
  client.emit(cmd, args);
};
