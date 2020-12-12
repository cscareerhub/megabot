import { addSalaryEmbed } from '../constants/embeds';
import client from '../../../client';

const handler = () => {
  client.message.author.send(addSalaryEmbed);
};

const addSalary = {
  example: 'add',
  handler,
  usage: 'Add salary information'
};

export default addSalary;
