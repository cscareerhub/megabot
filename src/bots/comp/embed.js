import Discord from 'discord.js';
import { color, compensationStrings } from './constants';

const embed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle(compensationStrings.title)
  .setDescription(compensationStrings.description());

export default embed;
