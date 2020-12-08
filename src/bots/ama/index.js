import client from '../../client';
import { parseCommandString } from "../../utils/index";
import addEvent from './subcommands/addEvent';
import listEvents from './subcommands/listEvents';

const subcommands = {'add': addEvent, 'list': listEvents}

client.on('ama', () => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (subCommand === undefined) {
    client.message.channel.send(getCommandsString());
    return;
  }

  let targetCmd = subcommands[subCommand];

  if (targetCmd === undefined) {
    client.message.channel.send('Invalid argument. Following arguments are permitted:');
    client.message.channel.send(getCommandsString());
    return;
  }

  targetCmd.handle(cmd.arguments);
});

let getCommandsString = () => {
  let str = "```\n";

  for (const [key, value] of Object.entries(subcommands)) {
    str += "-" + key + ": " + value.usage + "\n";
    str += "\tExample: " + value.example + "\n\n";
  }

  str += "```"

  return str;
}
