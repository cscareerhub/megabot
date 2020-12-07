const compConstants = {
  color: '',
  compensationFields: [
    {
      example: 'Mozilla',
      name: 'Company',
    },
    {
      example: 'Software Engineer I',
      name: 'Title',
    },
    {
      example: 'software Engineer',
      name: 'Date of Offer',
    },
    {
      example: 'Mountain View, California',
      name: 'Location',
    },
    {
      example: '$70,000',
      name: 'Salary',
    },
    {
      example: 'None',
      name: 'Stock/Recurring Bonus',
    },
    {
      example: '$5,000',
      name: 'Relocation/Signing Bonus',
    },
    {
      example: '80k/year',
      name: 'Total Compensation',
    },
  ],
  compensationFormatter: function (fields, isExample) {
    let str = '';
    if(!isExample) str += '```';
    str += '\n';
    str += '++salary';
    str += '\n';
    fields.forEach(field => {
      str += field.name + ': ';
      if (isExample) str += field.example;
      str += '\n';
    });
    if(!isExample) str += '```';
    str += '\n';
    return str;
  },
  description: function () {
    let str = '';
    this.descriptionFields.forEach(item => {
      str += item;
      str += '\n';
    });
    str += this.compensationFormatter(this.compensationFields);
    return str;
  },
  descriptionFields: [
    'Thank you for providing offer information from CSCH Chat Bot!',
    'We appreciate users like you who offer to give back to the community.',
    'All information is always **anonymous**. \n',
    'Please copy and paste what\'s **inside** the codeblock below:',
  ],
  title: 'Salary Reporter',
};

export default compConstants;