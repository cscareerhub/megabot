import client from '../../client';
import embed from './embed';

client.on('salary', (args) => {
  // If the user just said '++salary'
  let msg = client.message;
  if (args[0] === undefined) {
    msg.author.send(embed);
    return;
  }
});
