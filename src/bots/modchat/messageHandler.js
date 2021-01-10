import { DMChannel } from 'discord.js';
import client from '../../client';
import generateEmbed from '../../utils/embed';
import { getStrings } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { getModChannel, parseCommandString } from '../../utils/index';

/**
 * Handles direct messages from users to forward to moderation team.
 */
let handlePrivateMessage = async () => {
  let cmd = parseCommandString();
  let channel = client.message.channel;
  let strings = getStrings();

  if (cmd.arguments.length === 0) {
    channel.send(strings.explanation);
    return;
  }

  if (!(channel instanceof DMChannel)) {
    channel.send(strings.dmOnly);
    return;
  }

  let id = uuidv4();

  let modChannel = await getModChannel();

  let title =
    cmd.subCommand === '-a'
      ? 'Anonymous'
      : `${client.message.author.username}#${client.message.author.discriminator}`;

  let description = cmd.arguments.join(' ');

  if (cmd.subCommand !== '-a') {
    description = `${cmd.subCommand} ${description}`;
  }

  let embed = generateEmbed({
    description,
    footer: id,
    title
  });

  await modChannel.send(embed);
  channel.send(getStrings([id]).success);
};

export default handlePrivateMessage;
