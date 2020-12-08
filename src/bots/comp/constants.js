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
      example: 'December 2020',
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
    str += '\n';
    if(!isExample) str += '```\n';
    str += '++salary submit';
    str += '\n';
    fields.forEach(field => {
      str += field.name + ': ';
      if (isExample) str += field.example;
      str += '\n';
    });
    str += '\n';
    if(!isExample) str += '```';
    return str;
  },
  description: function () {
    let str = '';
    this.descriptionFields.forEach(item => {
      str += item;
    });
    str += this.compensationFormatter(this.compensationFields);
    return str;
  },
  descriptionFields: [
    'Thank you for providing offer information from CSCH Chat Bot!\n',
    'We appreciate users like you who offer to give back to the community.\n',
    'All information is always **anonymous**. \n\n',
    'Please copy and paste from the format below:',
  ],
  title: 'Salary Reporter',
};

export default compConstants;
