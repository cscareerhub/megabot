import { escapedBackticks } from '../../utils';

export const formFields = [
  {
    name: 'Company',
    placeholder: '<company name>'
  },
  {
    name: 'Title',
    placeholder: '<job title>'
  },
  {
    name: 'Date of Offer',
    placeholder: '<month year>'
  },
  {
    name: 'Location',
    placeholder: '<state, city> or <country>'
  },
  {
    name: 'Salary',
    placeholder: '<salary>'
  },
  {
    name: 'Stock/Recurring Bonus',
    placeholder: '<stock/annual bonus>'
  },
  {
    name: 'Relocation/Signing Bonus',
    placeholder: '<one-time bonuses>'
  },
  {
    name: 'Total Compensation',
    placeholder: '<total yearly compensation>'
  }
];

/** Generates a formatted description string using form fields */
export const description = () => {
  let form = '';
  formFields.forEach((field) => {
    form += field.name + ': ';
    form += field.placeholder;
    form += '\n';
  });

  return `Thank you for providing salary information to help others compare and make decisions! We appreciate community members like you who offer to give back to the community. All information is **anonymous**.\n\nPlease copy and paste and fill in the following:\n${escapedBackticks}\n++salary submit\n${form}\n${escapedBackticks}`;
};

export const addSalaryStrings = {
  description: description(),
  title: 'Salary Reporter'
};
