import client from '../../client';

const parsePairs = { date: dateParser, participants: participantParser };

/**
 * Parses dictionary and returns trimmed data with proper conventions for Event schema
 * @param {Object.<string, string>} dict - dictionary to be parsed
 * @returns {Object.<string, Object>} - dictionary with appropriate schema values
 */
let parseDictionary = (dict) => {
  let parsedValues = {};

  for (let d in dict) {
    let parser = get(parsePairs, d, defaultParser);

    parsedValues[d] = parser(dict[d]);
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
 * Tries to retrieve from dictionary, and returns default_value if nothing found
 * @param {Object.<string, Object>} object - dictionary of strings to be searched
 * @param {string} key - key to be searched in dictionary
 * @param {Object} default_value - value to be returned if value is not found
 */
let get = (object, key, default_value) => {
  var result = object[key];
  return typeof result !== 'undefined' ? result : default_value;
};

export default parseDictionary;
