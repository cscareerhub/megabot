import client from '../client';

/**
 * Parses message content for commands and arguments
 * @returns {Object.<string, (string | Array.<string>)>} - an object with the subCommand and arguments
 */
export function parseCommandString() {
  const messageArray = client.message.content.split(' ');
  return { arguments: messageArray.slice(2), subCommand: messageArray[1] };
}

/**
 *
 * @param {Array} array - array to be partitioned
 * @param {boolean} isValid
 */
export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
