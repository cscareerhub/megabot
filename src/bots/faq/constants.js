import { dedent, escapedBackticks } from '../../utils';

/**
 * Contructs string object with options
 * @param  {...any} options - data for strings and other options
 * @return {Object.<string, string>} - string object with all FAQ bot strings
 */
export const getStrings = (...options) => {
  options = options || [{}];
  return {
    createdFaq: `The following FAQ has been created:\n${options[0]}`,
    editFaqExample: `Split values by double newline. For example:\n${options[0]}`,
    faqNotFound: `FAQ with ID ${options[0]} not found`,
    insufficientArgumentsAddFaq: 'You must supply a term and a definition',
    insufficientArgumentsDefineFaq: 'Need to supply event ID',
    insufficientPermissions:
      'You have insufficient permissions to perform this action',
    noFaqs: 'No FAQs yet :(',
    successfullyDeleted: `FAQ with id ${options[0]} successfully deleted`
  };
};

/**
 * Possible edit fields
 */
export const possibleEditFields = dedent(
  `++faq edit 5fd3f9a4ea601010fe5875ff
  ${escapedBackticks}term: LC

  definition: LeetCode (LC) is a platform...

  references: https://leetcode.com, https://en.wikipedia.org/wiki/Competitive_programming${escapedBackticks}`
);

/**
 * Formats FAQ string
 * @param {Object.<string, any>} faq - FAQ to be formatted
 * @param {boolean} addReferences - setting to true will print reference links
 * @param {boolean} addId - setting to true will print database ID
 * @returns {string} - formatted FAQ string
 */
export const getFormattedFaq = (faq, addReferences, addId) => {
  let details = dedent(`**${faq.term}**: ${faq.definition}`);

  if (addReferences) {
    details += dedent(`
      References: ${faq.references?.join(', ') || ''}`);
  }

  if (addId) {
    details += dedent(`
      ID: ${faq._id}`);
  }

  return details;
};
