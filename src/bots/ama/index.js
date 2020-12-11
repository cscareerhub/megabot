import addEvent from './subCommands/addEvent';
import client from '../../client';
import listEvents from './subCommands/listEvents';
import { parseCommandString } from '../../utils/index';
import { getCommandsString, getStrings } from './constants';

const subCommands = { add: addEvent, list: listEvents };

client.on('ama', () => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.channel.send(getCommandsString());
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    client.message.channel.send(getStrings().invalidSubCommand);
    client.message.channel.send(getCommandsString(subCommands));
    return;
  }

  targetCmd.handle(cmd.arguments);
});
