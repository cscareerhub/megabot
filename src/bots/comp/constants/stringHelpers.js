import { escapedBackticks } from '../../../utils/embed';
import { fields } from '.';

export const description = () => {
  let form = '';
  fields.forEach((field) => {
    form += field.name + ': ';
    form += field.placeholder;
    form += '\n';
  });

  return `Thank you for providing salary information to help others compare and make decisions! We appreciate community members like you who offer to give back to the community. All information is **anonymous**.\n\nPlease copy and paste and fill in the following:\n${escapedBackticks}\n++salary submit\n${form}\n${escapedBackticks}`;
};
