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

  if (cmd.arguments.length === 0) {
    channel.send(getStrings().explanation);
    return;
  }

  if (!(channel instanceof DMChannel)) {
    channel.send(getStrings().dmOnly);
    return;
  }

  let messageId = uuidv4();

  let modChannel = await getModChannel();

  let title =
    cmd.subCommand === '-a'
      ? 'Anonymous'
      : `${client.message.author.username}#${client.message.author.discriminator}`;

  let messageBody = cmd.arguments.join(' ');

  if (cmd.subCommand !== '-a') {
    messageBody = `${cmd.subCommand} ${messageBody}`;
  }

  let embed = generateEmbed({
    description: messageBody,
    footer: messageId,
    title: title
  });

  await modChannel.send(embed);
  channel.send(getStrings([messageId]).success);
};

export default handlePrivateMessage;
