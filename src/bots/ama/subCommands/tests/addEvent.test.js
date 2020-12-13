import EventModel from '../../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import addEvent from '../addEvent';
import client from '../../../../client';
import { escapedBackticks } from '../../../../utils';
import mongoose from 'mongoose';
import 'babel-polyfill';

describe('adding Event', () => {
  let uri;

  test('ama creates an event if valid information provided', async () => {
    // When
    await addEvent.handler(['2020-04-20', 'Birthday', 'Party']);

    // Then
    let results = await EventModel.find({});

    await EventModel.deleteMany({});

    expect(results.length).toEqual(1);
    expect(results[0].title).toEqual('Birthday Party');
    expect(results[0].date.toDateString()).toEqual('Mon Apr 20 2020');

    expect(client.message.channel.send)
      .toHaveBeenCalledWith(`Following event has been created:
${escapedBackticks}
Event title: Birthday Party
Date: Mon Apr 20 2020${escapedBackticks}`);
  });

  test('ama does not create event with invalid day', async () => {
    // When
    await addEvent.handler(['2020-1011', 'Birthday', 'Party']);

    // Then
    let results = await EventModel.find({});

    expect(results.length).toEqual(0);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Invalid date provided. Must be in format yyyy-mm-dd'
    );
  });

  test('ama does not create event with insufficient information', async () => {
    // When
    await addEvent.handler(['2020-10-11']);

    // Then
    let results = await EventModel.find({});

    expect(results.length).toEqual(0);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Need to supply date (yyyy-mm-dd) and title of event\n' +
        '_Example_: 2020-01-01 start of the greatest year ever'
    );
  });

  beforeAll(async () => {
    client.message = {
      channel: {
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
