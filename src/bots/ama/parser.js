import client from '../../client';

const parsePairs = { date: dateParser, participants: participantParser };

let parseDictionary = (dict) => {
  let parsedValues = {};

  for (let d in dict) {
    let parser = get(parsePairs, d, defaultParser);

    parsedValues[d] = parser(dict[d]);
  }

  return parsedValues;
};

let dateParser = (dateString) => {
  let date = new Date(dateString + 'T12:00:00Z');

  if (date.toString() === 'Invalid Date') {
    client.logger.debug(dateString + ' was invalid');
  }

  return date;
};

let participantParser = (participants) => {
  let split = participants.split(',');

  for (let i = 0; i < split.length; i++) {
    split[i] = defaultParser(split[i]);
  }

  return split;
};

let defaultParser = (inString) => {
  return inString.trim();
};

let get = (object, key, default_value) => {
  var result = object[key];
  return typeof result !== 'undefined' ? result : default_value;
};

export default parseDictionary;
