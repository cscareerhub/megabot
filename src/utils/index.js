import client from '../client';

export function getArgs() {
  const messageArray = client.message.content.split(' ');
  return { rest: messageArray.slice(2), subCommand: messageArray[1] };
}
