import FaqModel from '../models/Faq';
import client from '../../../client';
import { getFormattedFaq, getStrings } from '../constants';

/**
 * Handles getting the specified definition for a term
 * @param {Array.<string>} args - rest of command arguments
 */
const handler = async (args) => {
  if (args.length != 1) {
    client.message.channel.send(getStrings().insufficientArgumentsDefineFaq);
    return;
  }

  let answer;

  const searchTerm = String(args[0]);
  try {
    answer = await FaqModel.findOne({ term: searchTerm }).exec();
  } catch (_) {
    client.message.channel.send(getStrings(args[0]).faqNotFound);
    return;
  }

  if (answer) {
    client.message.channel.send(getFormattedFaq(answer));
  } else {
    client.message.channel.send(getStrings(args[0]).faqNotFound);
  }
};

const defineFaq = {
  example: 'define LC',
  handler,
  usage: 'Specify the term you want to define'
};

export default defineFaq;
