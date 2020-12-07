import client from '../../../client';

const addEvent = {
    usage: "Specify date then title of event",
    example: "add 01/01/2020 Celebrate the best year to date",
    
    handle: (args) => {
        client.message.channel.send('Adding Event');
    }
  }

export default addEvent;