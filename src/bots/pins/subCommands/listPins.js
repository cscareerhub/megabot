import client from '../../../client';

const categories = ['Careers', 'Programming'];

/** Handles getting pinned messages and sending them */
const handler = () => {
  const channels = client.message.guild?.channels || {};
  channels.cache &&
    channels.cache.each((channel) => {
      if (categories.includes(channel.name)) {
        channel.children.each((child) => {
          generatePinStrings(child);
        });
      }
    });
};

/**
 * Generates pin strings and sends each pinned message to user's DMs
 * @param {Object.<string, any>} channel - channel where pins are from
 */
const generatePinStrings = (channel = {}) => {
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
