import client from '../../../client';
import EventModel from '../models/Event';
import { partition }  from '../../../utils/index';

const listEvents = {
  usage: "List all events",
  example: "list",

  handle: (args) => {
    EventModel.find({}).sort({date: 'asc'}).then(a => {
      if(a.length === 0) {
        client.message.channel.send("No events yet :(");
      } else {
        client.message.channel.send(formatEvents(a))
      }
    });
  }
}

let formatEvents = (events) => {
  let currentDate = new Date();
  let splitDate = partition(events, e => e.date > currentDate);

  let upcomingEvent = `__**Upcoming Event**__
${splitDate[0][0].date.toDateString()}: ${splitDate[0][0].title}
  `;

  let futureEvents = "__**Future Events**__\n";

  for(let i = 1; i < splitDate[0].length; i++) {
    let next = splitDate[0][i];

    futureEvents += "" + next.date.toDateString() + ": " + next.title + "\n";
  }

  let pastEvents = "__**Past Events**__\n";

  for(let s in splitDate[1]) {
    let next = splitDate[1][s];

    pastEvents += "" + next.date.toDateString() + ": " + next.title + "\n";
  }

  return `${pastEvents}
${upcomingEvent}
${futureEvents}`;
}

export default listEvents;
