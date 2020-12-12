import Event from '../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../client';
import deleteEvent from '../subCommands/deleteEvent';
import mongoose from 'mongoose';
import 'babel-polyfill';

describe('adding Event', () => {
  let uri;

  test('ama returns error message when no arguments passed in', async () => {
    // When
    await deleteEvent.handler([]);

    // Then
    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Need to supply event ID'
    );
  });

  test('ama does not delete if provided wrong object ID', async () => {
    // When
    await deleteEvent.handler(['5fd3f9a4ea601010fe5875f6']);

    // Then
    expect(client.message.channel.send).toHaveBeenCalledWith(
      'Event with id 5fd3f9a4ea601010fe5875f6 not found'
    );
  });

  test('ama does deletes when provided with correct object ID', async () => {
    // Given
    let event = await Event({
      date: new Date('2115-05-01T12:00:00Z'),
      title: 'Remove Me'
    }).save();

    // When
    await deleteEvent.handler([event.id]);

    // Then
    expect(client.message.channel.send).toHaveBeenCalledWith(
      `Event with id ${event.id} successfully deleted`
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
