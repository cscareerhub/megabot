import Event from '../../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../../client';
import { defaultStrings } from '../../../../constants';
import deleteEvent from '../deleteEvent';
import mongoose from 'mongoose';
import { strings } from '../../constants';
import * as permUtils from '../../../../utils/perms';
import 'babel-polyfill';

describe('deleting Event', () => {
  let uri;

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
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementation(() => false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  test('ama returns error message when no arguments passed in', async () => {
    await deleteEvent.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.insufficientArgumentsEvent
    );
  });

  test('ama returns error message when insufficient permissions', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        client.message.channel.send(defaultStrings.insufficientPermissions);
        return true;
      });

    await deleteEvent.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );
  });

  test('ama does not delete if provided wrong object ID', async () => {
    const id = '5fd3f9a4ea601010fe5875f6';
    await deleteEvent.handler([id]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.eventNotFound(id)
    );
  });

  test('ama does deletes when provided with correct object ID', async () => {
    let event = await Event({
      date: new Date('2115-05-01T12:00:00Z'),
      title: 'Remove Me'
    }).save();

    await deleteEvent.handler([event.id]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.successfullyDeleted(event.id)
    );
  });
});
