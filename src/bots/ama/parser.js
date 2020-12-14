import client from '../../client';

const parsePairs = { date: dateParser, participants: participantParser };

/**
 * Parses object and returns trimmed data with proper conventions for Event schema
 * @param {Object.<string, string>} obj - Object to be parsed
 * @returns {Object.<string, Object>} - Object with appropriate schema values
 */
let parseObject = (obj) => {
  let parsedValues = {};

  for (let d in obj) {
    let parser = get(parsePairs, d, defaultParser);

    parsedValues[d] = parser(obj[d]);
  }

  return parsedValues;
};

/**
 * Parses date and returns Date object at 12pm UTC
 * @param {string} dateString - Date that is to be parsed in the format YYYY-MM-DD
 * @returns {Date} - Date object represented by string
 */
let dateParser = (dateString) => {
  let date = new Date(dateString + 'T12:00:00Z');

  if (date.toString() === 'Invalid Date') {
    client.logger.debug(dateString + ' was invalid');
  }

  return date;
};

/**
 * Splits and trims strings based on comma
 * @param {string} participants - Participants in ama, split by comma
 * @returns {Array.<string>} - Participants in array format (all trimmed from leading and succeeding whitespace)
 */
let participantParser = (participants) => {
  let split = participants.split(',');

  for (let i = 0; i < split.length; i++) {
    split[i] = defaultParser(split[i]);
  }

  return split;
};

/**
 * Default string to be parsed. Is trimmed from all whitespace
 * @param {string} inString - string to be parsed.
 * @returns {string} - trimmed string from leading and succeeding whitespace
 */
let defaultParser = (inString) => {
  return inString.trim();
};

/**
 * Tries to retrieve from object, and returns default_value if nothing found
 * @param {Object.<string, Object>} object - object of strings to be searched
 * @param {string} key - key to be searched in object
 * @param {Object} defaultValue - value to be returned if value is not found
 */
let get = (object, key, defaultValue) => {
  var result = object[key];
  return result !== undefined ? result : defaultValue;
};

export default parseObject;
