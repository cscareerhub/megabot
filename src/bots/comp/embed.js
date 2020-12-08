import Discord from 'discord.js';
import compConstants from './constants';

const embed = new Discord.MessageEmbed()
  .setColor(compConstants.color)
  .setTitle(compConstants.title)
  .setAuthor('CS Careers Hub Official Bot')
  .setDescription(compConstants.description())
  .addFields({
    name: 'Example:',
    value: compConstants.compensationFormatter(
      compConstants.compensationFields,
      true
    )
  });

export default embed;
