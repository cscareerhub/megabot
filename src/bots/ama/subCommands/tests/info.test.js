import Event from '../../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../../client';
import { getFormattedEvent } from '../../constants';
import info from '../info';
import mongoose from 'mongoose';

describe('adding Event', () => {
  let uri;

  test('ama returns invalid message if no future events exist', async () => {
    await Event({
      date: new Date('1915-05-01T12:00:00Z'),
      title: 'Past 1'
    }).save();

    await info.handler([]);

    expect(client.message.author.send).toHaveBeenCalledWith(
      'No upcoming events found :('
    );
  });

  test('ama shows nearest future event info', async () => {
    await Event({
      date: new Date('2115-05-01T12:00:00Z'),
      title: 'Wrong'
    }).save();

    let futureEvent = await Event({
      date: new Date('2115-04-01T12:00:00Z'),
      title: 'Right'
    }).save();

    await info.handler([]);

    expect(client.message.author.send).toHaveBeenCalledWith(
      getFormattedEvent(futureEvent, true)
    );
  });

  beforeAll(async () => {
    client.message = {
      author: {
        send: jest.fn()
      }
    };

    const mongod = new MongoMemoryServer();
    uri = await mongod.getUri();
  });

  beforeEach(async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
});
