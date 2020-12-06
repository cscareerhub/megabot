import mongoose from 'mongoose';
import { parseMessage } from './utils';
import client, { BOT_TOKEN, MONGODB } from './utils/constants';

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => client.logger.info('DB is connected'))
  .catch((err) => client.logger.error(err));

client
  .on('ready', () => client.logger.info('Bot is connected'))
  .on('disconnect', () => client.logger.warn('Bot is disconnecting'))
  .on('reconnecting', () => client.logger.info('Bot reconnecting'))
  .on('error', (e) => client.logger.log(e, 'error'))
  .on('warn', (info) => client.logger.log(info, 'warn'));

client.login(BOT_TOKEN);

client.on('message', (msg) => parseMessage(msg));

process.on('unhandledRejection', (err) => {
  client.logger.error(err);
});
