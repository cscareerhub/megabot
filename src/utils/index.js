import { prefix, validCmds } from './constants';

export const parseMessage = (msg) => {
  msg = msg.toString();
  if (msg.substring(0, 2) === prefix) {
    const args = msg.substring(2).split(' ');
    const cmd = args[0];
    const subCmd = args[1];
    if (validCmds.includes(cmd)) {
      return { cmd, subCmd };
    }
  }
};
