import { addSalaryEmbed } from '../embeds';
import client from '../../../client';

/** Sends salary embed to DMs */
const handler = () => {
  client.message.author.send(addSalaryEmbed);
};

const addSalary = {
  example: 'add',
  handler,
  usage: 'Add salary information'
};

export default addSalary;
