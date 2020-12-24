import Faq from '../models/Faq';
import client from '../../../client';
import { getFormattedFaq, getStrings } from '../constants';
import { getMemberFromMessage, isMod } from '../../../utils/perms';

/**
 * Handles adding an faq to Faq schema and sends message with new FAQ
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (!isMod(getMemberFromMessage())) {
    client.message.channel.send(getStrings().insufficientPermissions);
    return;
  }

  if (args.length < 2) {
    client.message.channel.send(getStrings().insufficientArgumentsAddFaq);
    return;
  }

  let newFaq = await Faq({
    definition: args.slice(1).join(' '),
    term: args[0]
  }).save();

  client.message.channel.send(
    getStrings(getFormattedFaq(newFaq, false, false)).createdFaq
  );
};

const addFaq = {
  example: 'add LC LeetCode (LC) is a platform...',
  handler,
  usage: 'Adds new FAQ definition. Specify term then definition'
};

export default addFaq;
