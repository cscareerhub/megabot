import EventModel from '../models/Event';
import client from '../../../client';
import { getFormattedEvent, getStrings } from '../constants';
import { escapedBackticks } from '../../../utils/index';

const handler = async (args) => {
  if (args.length < 1) {
    client.message.channel.send(getStrings(possibleFields).editEventExample);
    return;
  }

  let targetEvent;

  try {
    targetEvent = await EventModel.findById(args[0]);
  } catch (_) {
    client.logger.debug('invalid ObjectId type supplied');
  }

  if (targetEvent) {
    if(client.message.content.indexOf(escapedBackticks) === -1) {
      client.message.channel.send('Must surround data with backticks (codeblock)');
      return;
    }

    let targetBlock = client.message.content.substring(
      client.message.content.indexOf(escapedBackticks) + 4, 
      client.message.content.lastIndexOf(escapedBackticks));
    
    let tokens = tokenizeEvent(targetBlock);

    targetEvent = await EventModel.findOneAndUpdate(args[0], tokens, {new: true});

    client.message.channel.send(getFormattedEvent(targetEvent, true));
  } else {
    client.message.channel.send(getStrings(args[0]).eventNotFound);
  }
};

let tokenizeEvent = (block) => {
  let split = block.split('\n\n');
  let tokens = {};

  for(let i = 0; i < split.length; i++) {
    let entry = split[i];
    let colonLocation = entry.indexOf(':');

    if(colonLocation === -1) {
      client.logger.debug(`Colon token identifier not found in ${entry}`);
      continue;
    }

    //TODO: validation & enhancement (e.g Date)
    tokens[entry.substring(0,colonLocation)] = entry.substring(colonLocation + 2);
  }

  return tokens;
}

const possibleFields = `++ama edit 5fd3f9a4ea601010fe5875ff
${escapedBackticks}url: https://google.com

date: 2020-12-25

description: Line 1
Line 2

title: Sample Event

participants: Kevin, Kevin Jr${escapedBackticks}`;

const editEvent = {
  example: 'edit 5fd3f9a4ea601010fe5875ff [Edit Params. Type in ++ama edit to see them]',
  handler,
  usage: 'Edits parameters of provided event. Enter ++ama edit to see all params that can be modified.'
};

export default editEvent;
