import { MONGODB } from './utils/constants';
import client from './client';
import mongoose from 'mongoose';
import './client';
import './bots/pins';

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => client.logger.info('DB is connected'))
  .catch((err) => client.logger.error(err));

process.on('unhandledRejection', (err) => {
  client.logger.error(err);
});
