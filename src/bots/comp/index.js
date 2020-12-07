import client from '../../client';
import embed from './embed';

client.on('salary', (args, msg) => {
  // If the user just said '++salary'
  if (args[0] === undefined) {
    msg.author.send(embed);
    return;
  }
});
