import { MONGODB } from './constants';
import client from './client';
import mongoose from 'mongoose';
import './client';
import './bots/ama';
import './bots/comp';
import './bots/ping';
import './bots/pins';

/**
 * Connect to MongoDB ip/port from .env
 * @param {string} MONGODB - the ip/port for the MongoDB connection.
 */
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
