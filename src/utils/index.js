import client from '../client';
import { defaultStrings } from '../constants';
import { get } from '../environment';

export const escapedBackticks = '```';

/**
 * Retrieves mod channel for bot alerts
 */
export const getModChannel = () => {
  return client.channels.get(get('MOD_CHANNEL_ID'));
};

/**
 * Handles bot-specific commands
 * @param {Object.<string, Object.<string, any>>} subCommands - subCommand objects with handlers
 * @param {Object.<string, string>} strings - string object containing bot message strings
 */
export const commandHandler = (subCommands, strings, options = {}) => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    options.handleNoSubCommand ||
      client.message.channel.send(getCommandsString(subCommands));
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    options.handleInvalidSubCommand ||
      client.message.channel.send(
        `${
          strings.invalidSubCommand || defaultStrings.invalidSubCommand
        }\n${getCommandsString(subCommands)}`
      );
    return;
  }

  targetCmd.handler(cmd.arguments);
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

/**
 * Parses message content for commands and arguments
 * @returns {Object.<string, (string | Array.<string>)>} - an object with the sub command and arguments
 */
export const parseCommandString = () => {
  const messageArray = client.message.content.split(/\s+/);
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
 * Unindents ES6-style concatenated strings
 * Source: https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
 * Note: only works when using spaces not tabs and will break strings that require double spaces
 * @param {string} string - the ES6 string to be unindented
 */
export const dedent = (string) => {
  return string.replace(/  +/g, '');
};
