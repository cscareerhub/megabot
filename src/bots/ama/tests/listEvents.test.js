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

    listEvents.handle([]);

    await new Promise(setImmediate);

    // await expect(client.message.channel.send).toHaveBeenCalledWith('Invalid date provided. Must be in format yyy-mm-dd');  
  });

  test('ama sends message when no events available', async () => {  
    listEvents.handle([]);

    await new Promise(setImmediate);

    // await expect(client.message.channel.send).toHaveBeenCalledWith('No events yet :(');  
  });

  afterEach(async () => {
      if(EventModel !== undefined) {
        await EventModel.deleteMany({});
      }
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

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
