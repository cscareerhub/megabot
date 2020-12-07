import client from '../client';
import { prefix, validCmds } from '../constants';

export const parseMessage = (msg) => {
  msgText = msg.toString();
  if (msgText.substring(0, 2) === prefix) {
    const args = msgText.substring(2).split(' ');
    const cmd = args[0];
    if (validCmds.includes(cmd)) {
      client.emit('command', cmd, args.splice(1), msg);
    }
  }
};

export const dispatchCmd = (cmd, args, msg) => {
  client.emit(cmd, args, msg);
};
