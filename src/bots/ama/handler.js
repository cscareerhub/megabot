import client from '../../client';
import { getCommandsString, parseCommandString } from '../../utils/index';
import { getStrings } from './constants';

const handler = (subCommands) => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.channel.send(getCommandsString(subCommands));
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    client.message.channel.send(
      `${getStrings().invalidSubCommand}\n${getCommandsString(subCommands)}`
    );
    return;
  }

  targetCmd.handler(cmd.arguments);
};

export default handler;
