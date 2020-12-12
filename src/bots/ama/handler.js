import client from '../../client';
import addEvent from './subCommands/addEvent';
import listEvents from './subCommands/listEvents';
import { getCommandsString, parseCommandString } from '../../utils/index';
import { getStrings } from './constants';

const subCommands = { add: addEvent, list: listEvents };

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
