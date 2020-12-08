const backticks = '```';

export const color = '#28B766';

export const compensationStrings = {
  compensationFields: [
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
  ],
  compensationFormatter: function (fields) {
    let str = '';
    fields.forEach((field) => {
      str += field.name + ': ';
      str += field.placeholder;
      str += '\n';
    });
    return str;
  },
  description: function () {
    return `Thank you for providing offer information from CSCH Chat Bot! We appreciate community members like you who offer to give back to the community. All information is **anonymous**.\n\nPlease copy and paste and fill in the following:\n${backticks}\n++salary submit\n${this.compensationFormatter(
      this.compensationFields
    )}\n${backticks}`;
  },
  title: 'Salary Reporter'
};
