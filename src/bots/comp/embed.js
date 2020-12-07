import Discord from 'discord.js';
// const embed = new Discord.MessageEmbed()
// .setColor('#0099ff')
// .setTitle('Salary Finder Menu')
// .setAuthor('The official CS Careers Hub Chat Bot')
// .setDescription('Thank you for requesting salary information from CSCH Chat Bot! We\'re glad to provide you with whatever information you need. \n\n Enter `++salary [value(1)] .. [value(n)]` to chain the following variables:')
// .addFields(
//   { name: 'Company', value: 'eg. FB, Apple, MSFT, Google', inline: true },
//   { name: 'Location', value: 'eg. NYC, Seattle, SF', inline: true },
//   { name: 'Level', value: 'eg. L3, S4, etc.', inline: true },
//   { name: 'Focus', value: 'eg. Full-stack, ML, Back-End', inline: true },
// )
// .addFields(
//   { name: 'Example:', value: '`++salary nyc google l3 full-stack`' },
// )

let compEmbed = {

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
    str += '```';
    fields.forEach(field => {
      str += field.name + ': ';
      if (isExample) str += field.example;
      str += '\n';
    });
    str += '```';
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
    'Please provide salary information in the format below:',
  ],
  title: 'Salary Reporter',
};


const embed = new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle(compEmbed.title)
  .setAuthor('CS Careers Hub Official Bot')
  .setDescription(compEmbed.description())
  .addFields(
    { name: 'Example:', value: compEmbed.compensationFormatter(compEmbed.compensationFields, true) },
  );


export default embed;