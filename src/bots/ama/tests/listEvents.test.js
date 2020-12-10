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
        date: new Date("2015-05-01T12:00:00Z")
    }).save();

    await Event({
        title: "Old 2",
        date: new Date("2015-03-01T12:00:00Z")
    }).save();

    await Event({
        title: "New 1",
        date: new Date("2125-05-01T12:00:00Z")
    }).save();

    await Event({
        title: "New 2",
        date: new Date("2128-03-15T12:00:00Z")
    }).save();

    await Event({
        title: "New 3",
        date: new Date("2128-04-20T12:00:00Z")
    }).save();

    await listEvents.handle([]);
    await EventModel.deleteMany({});
    
    expect(client.message.channel.send).toHaveBeenCalledWith(`__**Past Events**__
Sun Mar 01 2015: Old 2
Fri May 01 2015: Old 1

__**Upcoming Event**__
Tue May 01 2125: New 1

__**Future Events**__
Mon Mar 15 2128: New 2
Tue Apr 20 2128: New 3
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
