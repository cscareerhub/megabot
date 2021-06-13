import { DMChannel } from 'discord.js';
import client from '../../client';
import { defaultStrings } from '../../constants';
import generateEmbed from '../../utils/embed';
import { strings } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { getModChannel, parseCommandString } from '../../utils/index';

/**
 * Handles direct messages from users to forward to moderation team.
 */
let handlePrivateMessage = async () => {
  let cmd = parseCommandString();
  let channel = client.message.channel;
  let author = client.message.author;

  if (cmd.subCommand === undefined) {
    author.send(strings.explanation);
    return;
  }

  if (!(channel instanceof DMChannel)) {
    client.message.delete();
    author.send(defaultStrings.dmOnly);
    return;
  }

  let modChannel = await getModChannel();

  let title =
    cmd.subCommand === '-a'
      ? 'Anonymous'
      : `${client.message.author.username}#${client.message.author.discriminator}`;

  let description = cmd.arguments.join(' ');

  if (cmd.subCommand !== '-a') {
    description = `${cmd.subCommand} ${description}`;
  }

  let id = uuidv4();
  let embed = generateEmbed({
    description,
    footer: id,
    title
  });

  await modChannel.send(embed);
  channel.send(strings.success(id));
};

export default handlePrivateMessage;
