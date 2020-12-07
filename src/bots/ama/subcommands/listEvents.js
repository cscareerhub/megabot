import client from '../../../client';

const listEvents = {
  usage: "List all events",
  example: "list",

  handle: (args) => {
    client.message.channel.send('Listing all events');
  }
}

export default listEvents;
