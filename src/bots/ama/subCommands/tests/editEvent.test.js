import Event from '../../models/Event';
import EventModel from '../../models/Event';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../../client';
import { defaultStrings } from '../../../../constants';
import editEvent from '../editEvent';
import mongoose from 'mongoose';
import { dedent, escapedBackticks } from '../../../../utils';
import { possibleEditFields, strings } from '../../constants';
import * as permUtils from '../../../../utils/perms';
import 'babel-polyfill';

describe('adding Event', () => {
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

    mongoose.set('useFindAndModify', false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  test('ama does returns example when no arguments supplied', async () => {
    await editEvent.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.editEventExample(possibleEditFields)
    );
  });

  test('ama does no edits when invalid argument supplied', async () => {
    const id = 'abc123';
    await editEvent.handler([id]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.eventNotFound(id)
    );
  });

  test('ama does no edits when target Event is not found', async () => {
    const id = '5fd3f9a4ea601010fe5875ff';
    await editEvent.handler([id]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      strings.eventNotFound(id)
    );
  });

  test('ama returns error message when insufficient permissions', async () => {
    jest
      .spyOn(permUtils, 'insufficientPermissionsAlert')
      .mockImplementationOnce(() => {
        client.message.channel.send(defaultStrings.insufficientPermissions);
        return true;
      });

    await editEvent.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.insufficientPermissions
    );
  });

  test('ama edits and prints out updated info', async () => {
    let event = await Event({
      date: new Date('2015-05-01T12:00:00Z'),
      participants: ['Person 1', 'Person 2'],
      title: 'Event 1'
    }).save();

    client.message.content = dedent(`++ama edit ${event.id}
      title: Event 2
      
      url: https://cscareerhub.com`);

    await editEvent.handler([event.id]);

    let newEvent = await EventModel.findOne({});
    await EventModel.deleteMany({});

    expect(client.message.channel.send).toHaveBeenCalledWith(
      dedent(
        `${escapedBackticks}
        Event title: Event 2
        Date: Fri May 01 2015
        URL: https://cscareerhub.com
        Participant(s): Person 1, Person 2
        Description: ${escapedBackticks}`
      )
    );

    expect(newEvent.title).toEqual('Event 2');
    expect(newEvent.url).toEqual('https://cscareerhub.com');
    expect(newEvent.date).toEqual(event.date);
    expect(newEvent.participants.sort().toString()).toEqual(
      event.participants.sort().toString()
    );
  });
});
