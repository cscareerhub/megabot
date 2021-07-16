import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
export const environmentElements = [
  'BOT_TOKEN',
  'ENV',
  'MONGODB',
  'GUILD_ID',
  'BOT_PREFIX',
  'MOD_CHANNEL_ID',
  'DEV_CHANNEL_ID',
  'EVENT_QUESTIONS_CHANNEL_ID'
];

/**
 * Updates environment variable.
 * @param {string} key - the variable name to be updated. Only ones from @see{@link environmentElements}
 * @param {string} value - the value the environment variable should be set to
 */
export const updateElement = (key, value) => {
  if (!environmentElements.includes(key)) {
    return false;
  }

  process.env[key] = value;
  updateEnvironment();

  return true;
};

/**
 * Retrieves an environment variable value.
 * Should only be accessed with names from @see{@link environmentElements}
 * @param {string} arg - variable name
 */
export const get = (arg) => {
  return process.env[arg];
};

/**
 * Searches for all environment variables that belong to a channel ID
 *
 * @param {string} channelId - channel id to be tested
 * @returns array of environment IDs that relate to channel
 */
export const getElementsForChannelId = (channelId) => {
  let ids = [];

  for (let envVar of environmentElements) {
    if (get(envVar) === channelId) {
      ids.push(envVar);
    }
  }

  return ids;
};

/**
 * Rewrites .env file for updated values
 * reference: https://stackoverflow.com/questions/55660763/how-to-generically-update-an-existing-environment-variable-to-env-file
 */
let updateEnvironment = () => {
  var envContents = [];

  environmentElements.forEach((element) => {
    envContents.push(element + '=' + process.env[element]);
  });

  fs.writeFileSync('.env', envContents.join('\n'));
};
