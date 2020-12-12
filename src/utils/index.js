import client from '../client';
import { escapedBackticks } from './embed';

/**
 * Handles bot-specific commands
 * @param {Object.<string, Object.<string, any>>} subCommands 
 * @param {Object.<string, string>} strings 
 */
export const commandHandler = (subCommands, strings) => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.channel.send(getCommandsString());
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    client.message.channel.send(`${strings.invalidSubCommand}\n${getCommandsString(subCommands)}`);
    return;
  }

  targetCmd.handler(cmd.arguments);
};

/**
 * Parses message content for commands and arguments
 * @returns {Object.<string, (string | Array.<string>)>} - an object with the subCommand and arguments
 */
export const parseCommandString = () => {
  const messageArray = client.message.content.split(' ');
  return { arguments: messageArray.slice(2), subCommand: messageArray[1] };
};

/**
 * Splits up an array into multiple arrays based on a condition
 * @param {Array.<any>} array - array to be partitioned
 * @param {boolean} isValid - the condition to partition on
 */
export const partition = (array, isValid) => {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
};

/**
 * Lists sub commands inside a code block
 * @param {Array.<any>} subCommands - sub commands to be listed
 */
export const getCommandsString = (subCommands) => {
  let str = escapedBackticks + '\n';

  for (const [key, value] of Object.entries(subCommands)) {
    str += `- ${key}: ${value.usage}\n`;
    str += `\t- Example: ${value.example}\n\n`;
  }

  str += escapedBackticks;

  return str;
};
