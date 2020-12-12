import client from '../../client';
import { getCommandsString, parseCommandString } from '../../utils/index';
import { getStrings } from './constants';
import addEvent from './subcommands/addEvent';
import listEvents from './subcommands/listEvents';

export const subCommands = { add: addEvent, list: listEvents };

const handler = () => {
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
