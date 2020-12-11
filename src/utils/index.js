import client from '../client';

export function parseCommandString() {
  const messageArray = client.message.content.split(' ');
  return { arguments: messageArray.slice(2), subCommand: messageArray[1] };
}

export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
