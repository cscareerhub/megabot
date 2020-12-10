import { MONGODB } from '../../../constants';
import listEvents from '../subcommands/listEvents';
import client from '../../../client';
import EventModel from '../models/Event';
import Event from '../models/Event';
import mongoose from 'mongoose';
import 'babel-polyfill';

describe('adding Event', () => {
  test('ama lists all events', async () => {  
    await Event({
        title: "Old 1",
        date: new Date("2015-05-01")
    }).save();

    await Event({
        title: "Old 2",
        date: new Date("2015-03-01")
    }).save();

    await Event({
        title: "New 1",
        date: new Date("2125-05-01")
    }).save();

    await Event({
        title: "New 2",
        date: new Date("2128-03-15")
    }).save();

    await Event({
        title: "New 3",
        date: new Date("2128-04-20")
    }).save();

    await listEvents.handle([]);
    await EventModel.deleteMany({});
    
    expect(client.message.channel.send).toHaveBeenCalledWith(`__**Past Events**__
Sat Feb 28 2015: Old 2
Thu Apr 30 2015: Old 1

__**Upcoming Event**__
Mon Apr 30 2125: New 1

__**Future Events**__
Sun Mar 14 2128: New 2
Mon Apr 19 2128: New 3
`);  
  });

  test('ama sends message when no events available', async () => {  
    await listEvents.handle([]);

    expect(client.message.channel.send).toHaveBeenCalledWith('No events yet :(');  
  });

  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      }
    };

    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
});
