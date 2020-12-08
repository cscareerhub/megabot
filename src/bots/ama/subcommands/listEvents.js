import client from '../../../client';
import EventModel from '../models/Event';
import { partition }  from '../../../utils/index';

const listEvents = {
  usage: "List all events",
  example: "list",

  handle: (args) => {
    EventModel.find({}).sort({date: 'asc'}).then(a => client.message.channel.send(formatEvents(a)));
  }
}

let formatEvents = (events) => {
  let currentDate = new Date();
  let splitDate = partition(events, e => e.date > currentDate);

  let upcomingEvent = "-={Upcoming Event}=-\n" + splitDate[0][0].date.toDateString() + ": " + splitDate[0][0].title + "\n";

  let futureEvents = "-={Future Events}=-\n";

  for(let s in splitDate[0].slice(1)) {
    let next = splitDate[0][s];

    futureEvents += "" + next.date.toDateString() + ": " + next.title + "\n";
  }

  let pastEvents = "-={Past Events}=-\n";

  for(let s in splitDate[1]) {
    let next = splitDate[1][s];

    pastEvents += "" + next.date.toDateString() + ": " + next.title + "\n";
  }

  return "```\n" + pastEvents + "\n" + upcomingEvent + "\n" + futureEvents + "\n```";
}

export default listEvents;
