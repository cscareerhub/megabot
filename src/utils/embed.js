import Discord from 'discord.js';

export const escapedBackticks = '```';
export const color = '#28B766';

export const generateEmbed = (strings, options = {}) => {
  const embed = new Discord.MessageEmbed()
    .setColor(options.color || color)
    .setTitle(strings.title)
    .setDescription(strings.description);

  return embed;
};

export default generateEmbed;
