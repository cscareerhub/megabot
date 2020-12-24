import FaqModel from '../models/Faq';
import client from '../../../client';
import { parseCommandString } from '../../../utils/index';
import { getFormattedFaq, getStrings } from '../constants';

/**
 * Handles finding FAQs in the Faq schema and listing them in a message
 */
const handler = async () => {
  let faqs = await FaqModel.find({}).sort({ _id: 'asc' });

  if (faqs.length === 0) {
    await client.message.channel.send(getStrings().noFaqs);
  } else {
    let parsedCmd = parseCommandString();

    client.message.channel.send(
      formatFaqs(faqs, parsedCmd.arguments.length > 0)
    );
  }
};

/**
 * Formats FAQs into a readable string
 * @param {Array.<Object.<string, any>>} faqs - list of faq objects
 * @param {boolean} showIds - trigger that shows FAQ database IDs if set to true
 * @returns {string} - message string with all FAQs
 */
const formatFaqs = (faqs, showIds) => {
  let allFaqs = '**All FAQs:**\n\n';

  faqs.forEach(
    (faq) => (allFaqs += `${getFormattedFaq(faq, true, showIds)}\n\n`)
  );

  return allFaqs;
};

const listFaqs = {
  example: 'list [-i]',
  handler,
  usage: 'List all FAQs. Add -i flag to see FAQ IDs.'
};

export default listFaqs;
