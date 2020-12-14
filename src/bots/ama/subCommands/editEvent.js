import EventModel from '../models/Event';
import client from '../../../client';
import { escapedBackticks } from '../../../utils/index';
import parseDictionary from '../parser';
import {
  getFormattedEvent,
  getStrings,
  possibleEditFields
} from '../constants';

/**
 * Handles editing an event with Event schema and sends message with updated event
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (args.length < 1) {
    client.message.channel.send(
      getStrings(possibleEditFields).editEventExample
    );
    return;
  }

  let targetEvent;

  try {
    targetEvent = await EventModel.findById(args[0]);
  } catch (_) {
    client.logger.debug('invalid ObjectId type supplied');
  }

  if (targetEvent) {
    if (client.message.content.indexOf(escapedBackticks) === -1) {
      client.message.channel.send(getStrings().noBackticks);
      return;
    }

    let targetBlock = client.message.content.substring(
      client.message.content.indexOf(escapedBackticks) + 4,
      client.message.content.lastIndexOf(escapedBackticks)
    );

    let tokens = tokenizeEvent(targetBlock);

    targetEvent = await EventModel.findOneAndUpdate(
      { _id: args[0] },
      { $set: tokens },
      { new: true }
    );

    client.message.channel.send(getFormattedEvent(targetEvent, true));
  } else {
    client.message.channel.send(getStrings(args[0]).eventNotFound);
  }
};

/**
 * Tokenizes a string block by splitting on double newline then keys are values pre colon and values past colon
 * @param {string} block - block of text to be turned into dictionary
 */
let tokenizeEvent = (block) => {
  let split = block.split('\n\n');
  let tokens = {};

  for (let i = 0; i < split.length; i++) {
    let entry = split[i];
    let colonLocation = entry.indexOf(':');

    if (colonLocation === -1) {
      client.logger.debug(`Colon token identifier not found in ${entry}`);
      continue;
    }

    tokens[entry.substring(0, colonLocation)] = entry.substring(
      colonLocation + 2
    );
  }

  return parseDictionary(tokens);
};

const editEvent = {
  example:
    'edit 5fd3f9a4ea601010fe5875ff [Edit Params. Type in ++ama edit to see them]',
  handler,
  usage:
    'Edits parameters of provided event. Enter ++ama edit to see all params that can be modified.'
};

export default editEvent;
