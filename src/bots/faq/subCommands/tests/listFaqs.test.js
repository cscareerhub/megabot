import Faq from '../../models/Faq';
import FaqModel from '../../models/Faq';
import { MongoMemoryServer } from 'mongodb-memory-server';
import client from '../../../../client';
import { dedent } from '../../../../utils';
import listFaqs from '../listFaqs';
import mongoose from 'mongoose';
import 'babel-polyfill';

describe('listing Faqs', () => {
  let uri;

  test('faq list lists all faqs', async () => {
    await Faq({
      definition: 'LeetCode (LC) is a platform',
      references: ['https://leetcode.com/'],
      term: 'LC'
    }).save();

    // Test behavior on identical terms/definitions with different IDs
    await Faq({
      definition: 'LeetCode (LC) is a platform',
      references: ['https://leetcode.com/'],
      term: 'LC'
    }).save();

    await Faq({
      definition: 'This is an entirely different definition',
      references: ['https://leetcode.com/'],
      term: 'LC'
    }).save();

    await Faq({
      definition: "You're on it!",
      references: ['https://leetcode.com/'],
      term: 'CSCH'
    }).save();

    await listFaqs.handler([]);

    const expectedFaqList = dedent(
      `**All FAQs:**

      **LC**: LeetCode (LC) is a platform
      References: https://leetcode.com/

      **LC**: LeetCode (LC) is a platform
      References: https://leetcode.com/

      **LC**: This is an entirely different definition
      References: https://leetcode.com/

      **CSCH**: You're on it!
      References: https://leetcode.com/\n
      `
    );

    expect(client.message.channel.send).toHaveBeenCalledWith(expectedFaqList);
  });

  test('faq list sends message when no FAQs available', async () => {
    await listFaqs.handler([]);
    expect(client.message.channel.send).toHaveBeenCalledWith('No FAQs yet :(');
  });

  test('faq list sends message with ID when requested with flag', async () => {
    let faq = await Faq({
      definition: 'FAQ',
      term: 'Example'
    }).save();

    client.message.content = '++faq list -i';

    await listFaqs.handler([]);

    const expectedFaqList = dedent(`**All FAQs:**

      **Example**: FAQ
      References: \nID: ${faq._id}\n
`);

    expect(client.message.channel.send).toHaveBeenCalledWith(expectedFaqList);
  });

  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      },

      content: '++faq list'
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
