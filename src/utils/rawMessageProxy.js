/**
 * Process reactions for messages that are not in the cache.
 * This typically occurs after bot is restarted and cache is cleared.
 * End result is it emits messageReactionAdd or messageReactionRemove.
 *
 * @param {Discord.Client} client - discord client for the bot.
 * @param {string} rawMessage - JSON packet that represents a raw discord message.
 */
export const processRawMessageForReactions = async (client, rawMessage) => {
  // Code is largely based off of https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/coding-guides/raw-events.md
  // May need modifications in the future if discord decides to change packet pattern
  if (
    !['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(rawMessage.t)
  ) {
    return;
  }

  const channel = await client.channels.fetch(rawMessage.d.channel_id);

  if (!channel || channel.messages.cache.has(rawMessage.d.message_id)) {
    return;
  }

  const message = await channel.messages.fetch(rawMessage.d.message_id);

  if (!message) {
    return;
  }

  const emoji = rawMessage.d.emoji.id
    ? `${rawMessage.d.emoji.name}:${rawMessage.d.emoji.id}`
    : rawMessage.d.emoji.name;

  const reaction = message.reactions.cache.get(emoji);

  if (reaction) {
    const user = client.users.cache.get(rawMessage.d.user_id);

    reaction.users.cache.set(rawMessage.d.user_id, user);

    if (rawMessage.t === 'MESSAGE_REACTION_ADD') {
      client.emit('messageReactionAdd', reaction, user);
    } else if (rawMessage.t === 'MESSAGE_REACTION_REMOVE') {
      client.emit('messageReactionRemove', reaction, user);
    }
  }
};
