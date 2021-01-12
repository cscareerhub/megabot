import EventModel from '../models/Event';
import client from '../../../client';
import parseObject from '../parser';
import { getFormattedEvent, strings, possibleEditFields } from '../constants';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles editing an event with Event schema and sends message with updated event
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(strings.insufficientPermissions);
    return;
  }

  if (args.length < 1) {
    client.message.channel.send(strings.editEventExample(possibleEditFields));
    return;
  }

  let targetEvent;
  const targetId = args[0];

  try {
    targetEvent = await EventModel.findById(targetId);
  } catch {
    client.logger.debug('Invalid ObjectId type supplied');
  }

  if (targetEvent) {
    let targetBlock = client.message.content.substring(
      client.message.content.indexOf(targetId) + targetId.length + 1
    );

    let tokens = tokenizeEvent(targetBlock);

    targetEvent = await EventModel.findOneAndUpdate(
      { _id: targetId },
      { $set: tokens },
      { new: true }
    );

    client.message.channel.send(getFormattedEvent(targetEvent, true));
  } else {
    client.message.channel.send(strings.eventNotFound(targetId));
  }
};

/**
 * Tokenizes a string block by splitting on double newline then keys are values pre colon and values past colon
 * @param {string} block - block of text to be turned into plain javascript object
 */
let tokenizeEvent = (block) => {
  const split = block.split('\n\n');
  let tokens = {};

  for (let entry of split) {
    let colonLocation = entry.indexOf(':');

    if (colonLocation === -1) {
      client.logger.debug(`Colon token identifier not found in ${entry}`);
      continue;
    }

    tokens[entry.substring(0, colonLocation)] = entry.substring(
      colonLocation + 2
    );
  }

  return parseObject(tokens);
};

const editEvent = {
  example:
    'edit 5fd3f9a4ea601010fe5875ff [Edit Params. Type in ++ama edit to see them]',
  handler,
  usage:
    'Edits parameters of provided event. Enter ++ama edit to see all params that can be modified.'
};

export default editEvent;
