import Faq from '../../models/Faq';
import FaqModel from '../../models/Faq';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../../client';
import { dedent } from '../../../../utils';
import defineFaq from '../defineFaq';
import mongoose from 'mongoose';
import 'babel-polyfill';

describe('defining individual Faqs', () => {
  let uri;

  test('faq define gets the correct result', async () => {
    await Faq({
      definition: 'LeetCode (LC) is a platform',
      references: ['https://leetcode.com/'],
      term: 'LC'
    }).save();

    await Faq({
      definition: 'Cracking the Coding Interview (CTCI) is a book',
      references: ['https://leetcode.com/'],
      term: 'CTCI'
    }).save();

    await Faq({
      definition: "You're on it!",
      references: ['https://leetcode.com/'],
      term: 'CSCH'
    }).save();

    await defineFaq.handler(['LC']);

    const expectedFaqDefinition = dedent('**LC**: LeetCode (LC) is a platform');

    expect(client.message.channel.send).toHaveBeenCalledWith(
      expectedFaqDefinition
    );
  });

  test('faq define sends message when no FAQs available', async () => {
    await defineFaq.handler(['LC']);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      'FAQ with name or ID LC not found'
    );
  });

  test('faq define sends message when no arguments used', async () => {
    await defineFaq.handler([]);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      'You must supply a term to define'
    );
  });

  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      },

      content: '++faq define'
    };

    const mongod = new MongoMemoryServer();
    uri = await mongod.getUri();
  });

  beforeEach(async () => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await FaqModel.deleteMany({});
  });
});
