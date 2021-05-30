import { DMChannel } from 'discord.js';
import client from '../client';
import { get } from '../environment';
import { defaultStrings, envs } from '../constants';

export const escapedBackticks = '```';

/**
 * Handles bot-specific commands
 * @param {Object.<string, Object.<string, any>>} subCommands - subCommand objects with handlers
 */
export const commandHandler = (subCommands) => {
  let cmd = parseCommandString();
  let subCommand = cmd.subCommand;

  if (!subCommand) {
    client.message.channel.send(getCommandsString(subCommands));
    return;
  }

  let targetCmd = subCommands[subCommand];

  if (!targetCmd) {
    client.message.channel.send(
      defaultStrings.invalidSubCommand(getCommandsString(subCommands))
    );
    return;
  }

  targetCmd.handler(cmd.arguments);
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
 * Retrieves mod channel for bot alerts
 */
export const getModChannel = async () => {
  const guild = await client.guilds.fetch(get('GUILD_ID'));
  return guild.channels.cache.get(get('MOD_CHANNEL_ID'));
};

/**
 * Parses message content for commands and arguments
 * @returns {Object.<string, (string | Array.<string>)>} - an object with the sub command and arguments
 */
export const parseCommandString = () => {
  const messageArray = client.message.content.split(/\s+/);
  return {
    arguments: messageArray.slice(2),
    subCommand: messageArray[1]
  };
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
 * Whether or not bot should be listening to events
 * @param {Object.<string, any>} message - message that was sent
 */
export const shouldListen = (message) => {
  const env = get('ENV');
  const shouldDevListen =
    env === envs.DEVELOPMENT && get('DEV_CHANNEL_ID') === message.channel.id;
  const shouldProdListen = env === envs.PRODUCTION && !get('DEV_CHANNEL_ID') !== message.channel.id;

  return (
    message.channel instanceof DMChannel ||
    env === envs.TESTING ||
    shouldProdListen ||
    shouldDevListen
  );
};
