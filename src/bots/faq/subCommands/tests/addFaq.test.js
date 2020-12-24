import FaqModel from '../../models/Faq';
import { MongoMemoryServer } from 'mongodb-memory-server';
import addFaq from '../addFaq';
import client from '../../../../client';
import { dedent } from '../../../../utils';
import mongoose from 'mongoose';
import * as permUtils from '../../../../utils/perms';

describe('adding Faq', () => {
  let uri;

  test('faq creates an FAQ if valid information provided', async () => {
    await addFaq.handler(['LC', 'LeetCode', '(LC)', 'is', 'a', 'platform']);
    let results = await FaqModel.find({});
    await FaqModel.deleteMany({});

    expect(results.length).toEqual(1);
    expect(results[0].term).toEqual('LC');
    expect(results[0].definition).toEqual('LeetCode (LC) is a platform');
    expect(client.message.channel.send).toHaveBeenCalledWith(
      dedent(`The following FAQ has been created:
        **LC**: LeetCode (LC) is a platform`)
    );
  });

  test('faq add returns error message with insufficient permissions', async () => {
    jest.spyOn(permUtils, 'isMod').mockImplementationOnce(() => false);

    await addFaq.handler([]);

    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You have insufficient permissions to perform this action'
    );
  });

  test('faq add does not create faq with insufficient information', async () => {
    await addFaq.handler(['LC']);
    let results = await FaqModel.find({});

    expect(results.length).toEqual(0);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You must supply a term and a definition'
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
    jest.spyOn(permUtils, 'isMod').mockImplementation(() => true);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
});
