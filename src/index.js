import client from './client';
import { get } from './environment';
import mongoose from 'mongoose';
import './client';
import './bots/ama';
import './bots/comp';
import './bots/faq';
import './bots/ping';
import './bots/pins';
import './bots/settings';

mongoose.set('useFindAndModify', false);

mongoose
  .connect(get('MONGODB'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => client.logger.info('DB is connected'))
  .catch((err) => client.logger.error(err));

process.on('unhandledRejection', (err) => {
  client.logger.error(err);
});
