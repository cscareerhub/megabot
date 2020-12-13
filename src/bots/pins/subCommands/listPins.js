import client from '../../../client';

const handler = () => {
  const channels =
    (client.message.guild && client.message.guild.channels) || [];
  generatePinString(channels);
};

const generatePinString = (channels) => {
  // TODO: this should be configurable
  const categories = ['Careers', 'Programming'];
  channels.cache &&
    channels.cache.each((channel) => {
      if (categories.includes(channel.name)) {
        channel.children.each((child) => {
          child.messages &&
            child.messages
              .fetchPinned()
              .then((messages) => {
                let pins = `**#${child.name}**\n\n`;
                messages.each((message) => {
                  pins += message.content ? `${message.content}\n\n` : '';
                });
                client.message.author.send(pins);
              })
              .catch((err) => console.log(err));
        });
      }
    });
};

const listPins = {
  example: 'list',
  handler,
  usage: 'List all pinned resources'
};

export default listPins;
