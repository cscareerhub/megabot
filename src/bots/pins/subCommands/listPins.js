import client from '../../../client';

// TODO: this should be configurable
const categories = ['Careers', 'Programming'];

const handler = () => {
  const channels = client.message.guild?.channels || {};
  channels.cache &&
    channels.cache.each((channel) => {
      if (categories.includes(channel.name)) {
        channel.children.each((child) => {
          generatePinString(child);
        });
      }
    });
};

const generatePinString = (channel = {}) => {
  channel.messages
    .fetchPinned()
    .then((messages) => {
      let pins = `**#${channel.name}**\n\n`;
      messages.each((message) => {
        pins += message.content ? `${message.content}\n\n` : '';
      });
      client.message.author.send(pins);
    })
    .catch((err) => client.logger.error(err));
};

const listPins = {
  example: 'list',
  handler,
  usage: 'List all pinned resources'
};

export default listPins;
