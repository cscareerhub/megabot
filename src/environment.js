import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
export const environmentElements = [
  'BOT_TOKEN',
  'ENV',
  'MONGODB',
  'GUILD_ID',
  'PREFIX',
  'MOD_CHANNEL_ID'
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
 * Rewrites .env file for updated values
 */
let updateEnvironment = () => {
  //reference: https://stackoverflow.com/questions/55660763/how-to-generically-update-an-existing-environment-variable-to-env-file
  var envContents = [];

  environmentElements.forEach((element) => {
    envContents.push(element + '=' + process.env[element]);
  });

  fs.writeFileSync('.env', envContents.join('\n'));
};
