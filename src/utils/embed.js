import Discord from 'discord.js';

export const escapedBackticks = '```';
export const color = '#28B766';

/**
 * Generates a Discord embed from strings
 * @param {Object.<string, string>} strings - strings to set various embed properties
 * @param {Object.<string, any>} options - options that override any defaults
 */
export const generateEmbed = (strings, options = {}) => {
  const embed = new Discord.MessageEmbed()
    .setColor(options.color || color)
    .setTitle(strings.title)
    .setDescription(strings.description);

  return embed;
};

export default generateEmbed;
