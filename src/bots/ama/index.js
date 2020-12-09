import client from '../../client';
import { parseCommandString } from "../../utils/index";
import { escapedBackticks } from "../../utils/embed";
import addEvent from './subCommands/addEvent';
import listEvents from './subCommands/listEvents';

const subCommands = {add: addEvent, list: listEvents}

client.on('ama', () => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.channel.send(getCommandsString());
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    client.message.channel.send('Invalid argument. Following arguments are permitted:');
    client.message.channel.send(getCommandsString());
    return;
  }

  targetCmd.handle(cmd.arguments);
});

let getCommandsString = () => {
  let str = escapedBackticks + "\n";

  for (const [key, value] of Object.entries(subCommands)) {
    str += `- ${key}: ${value.usage}\n`;
    str += `\t- Example: ${value.example}\n\n`
  }

  str += escapedBackticks

  return str;
}
