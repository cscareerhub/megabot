import client from '../../client';
import addEvent from './subcommands/addEvent'
import listEvents from './subcommands/listEvents'

const subcommands = {'add': addEvent, 'list': listEvents}

client.on('ama', (args) => {
  if (args.length === 0) {
    client.message.channel.send(getCommandsString());
    return;
  }

  let targetCmd = subcommands[args[0]];

  if (targetCmd === undefined) {
    client.message.channel.send('Invalid argument. Following arguments are permitted:');
    client.message.channel.send(getCommandsString());
    return;
  }

  targetCmd.handle(args);
});

function getCommandsString() {
  let str = "```\n";

  for (const [key, value] of Object.entries(subcommands)) {
    str += key + ": " + value.usage + "\n";
    str += "Example: " + value.example + "\n\n";
  }

  str += "```"

  return str;
}