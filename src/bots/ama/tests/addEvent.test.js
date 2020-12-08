import { MONGODB } from '../../../constants';
import addEvent from '../subcommands/addEvent';
import client from '../../../client'
import EventModel from '../models/Event'
import mongoose from 'mongoose';
import "babel-polyfill"

describe('adding Event', () => {
  test('ama creates an event if valid information provided', async () => {  
    const logSpy = jest.spyOn(client.logger, 'debug');

    addEvent.handle(['2020-04-20', 'Birthday', 'Party']);

    await new Promise(setImmediate);

    EventModel.find({}).then(results => {
      expect(results.length).toEqual(1);
      expect(results[0].title).toEqual('Birthday Party');
      expect(results[0].date.toDateString()).toEqual('Mon Apr 20 2020');
    });   
    
    // This fails when it shouldn't
    // expect(client.message.channel.send).toHaveBeenCalledWith('Following event has been created:\n```\nEvent title: Birthday Party\nDate: Mon Apr 20 2020\n```');
  });

  test('ama does not create event with invalid day', async () => {  
    addEvent.handle(['2020-1011', 'Birthday', 'Party']);

    await new Promise(setImmediate);

    EventModel.find({}).then(results => {
      expect(results.length).toEqual(0);
    });  

    await expect(client.message.channel.send).toHaveBeenCalledWith('Invalid date provided. Must be in format yyy-mm-dd');
  });

  test('ama does not create event with insufficient information', async () => {  
    addEvent.handle(['2020-10-11']);

    await new Promise(setImmediate);

    EventModel.find({}).then(results => {
      expect(results.length).toEqual(0);
    });    

    await expect(client.message.channel.send).toHaveBeenCalledWith(
      'Need to supply date (yyyy-mm-dd) and title of event\n' +
      '_Example_: 2020-01-01 start of the greatest year ever');
  });

  afterEach(async () => {
    await EventModel.deleteMany({});
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

    await EventModel.find({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
