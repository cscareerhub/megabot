import EventModel from '../../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import addEvent from '../addEvent';
import client from '../../../../client';
import { defaultStrings } from '../../../../constants';
import mongoose from 'mongoose';
import { strings } from '../../constants';
import { dedent, escapedBackticks } from '../../../../utils';
import * as permUtils from '../../../../utils/perms';

describe('adding Event', () => {
  let uri;

  test('ama creates an event if valid information provided', async () => {
    await addEvent.handler(['2020-04-20', 'Birthday', 'Party']);
    let results = await EventModel.find({});
    await EventModel.deleteMany({});

    expect(results.length).toEqual(1);
    expect(results[0].title).toEqual('Birthday Party');
    expect(results[0].date.toDateString()).toEqual('Mon Apr 20 2020');
    expect(client.message.channel.send).toHaveBeenCalledWith(
      dedent(`The following event has been created:
        ${escapedBackticks}
        Event title: Birthday Party
        Date: Mon Apr 20 2020${escapedBackticks}`)
    );
  });

  test('ama does not create event with invalid day', async () => {
    await addEvent.handler(['2020-1011', 'Birthday', 'Party']);
    let results = await EventModel.find({});

    expect(results.length).toEqual(0);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.invalidDateAddEvent
    );
  });

  test('ama returns error message when insufficient permissions', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        client.message.channel.send(defaultStrings.insufficientPermissions);
        return true;
      });

    await addEvent.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );
  });

  test('ama does not create event with insufficient information', async () => {
    await addEvent.handler(['2020-10-11']);
    let results = await EventModel.find({});

    expect(results.length).toEqual(0);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.insufficientArgumentsAddEvent
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
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementation(() => false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
});
