import { Util } from 'discord.js';
import { VALID_FORMATS } from './constants';
import {
  CHANNEL_INFORMATION,
  CHANNEL_NAMES, // eslint-disable-line
  defaultStrings
} from './constants';

/**
 * Verifies if an attachment matches the valid image
 * and file formats for a resume review.
 * @param {Object} attachment
 * @returns {boolean}
 */
export function attachmentIsAllowed(attachment) {
  const { url } = attachment;
  return VALID_FORMATS.some((format) => url.endsWith(format));
}

/**
 * Sends the deleted original message back to the author
 * @param {Object} message
 */
export async function deleteAndReturnMessage(message) {
  // Handle edge case where we hit content limit.
  // Have to split messages otherwise fails to send
  const splitMessages = Util.splitMessage(
    defaultStrings.returnDeletedMsg(message.content)
  );
  const numMessages = splitMessages.length;

  // Get Array<Attachments>
  const attachmentsArr = getAttachmentsArrFromMap(message.attachments);

  // Send each of the messages
  splitMessages.forEach((msg, idx) => {
    // Attach attachments to the last message
    const isLastMessage = idx + 1 === numMessages;
    const files = isLastMessage ? attachmentsArr : [];

    // Attach attachments to last message
    message.author.send({ content: msg, files });
  });

  // Delete the message
  message.delete();
}

/**
 * Helper function to get Attachments as array
 * Three step process:
 * 1. Attachments comes in as Map<ID, Attachment>
 * 2. Turn it into Array<Array<ID, Attachment>>
 * 3. Turn it into Array<Attachment>
 * @param {Array<Object>} attachments
 * @returns
 */
export function getAttachmentsArrFromMap(attachments) {
  const attachmentIdArr = Array.from(attachments);
  // eslint-disable-next-line
  const attachmentArr = attachmentIdArr.map(([id, attachment]) => attachment);
  return attachmentArr;
}

/**
 * Checks if a message is a reply for another message
 * @param {Object} message
 * @returns {boolean}
 */
export function isMessageReply(message) {
  return message.reference !== null;
}

/**
 * Check if it's a channel name we know
 * @param {string} channelName
 */
export function isKnownChannelName(channelName) {
  const channelNames = Object.keys(CHANNEL_INFORMATION);
  return channelNames.includes(channelName);
}

/**
 * Gets the channel's post title for channel name
 * @param {CHANNEL_NAMES} channelName Name of the channel
 * @returns {string} The post title for relevant channel
 */
export function getChannelPostTitleForName(channelName) {
  if (isKnownChannelName(channelName))
    return CHANNEL_INFORMATION[channelName].postTitle;

  // Should never go into this case
  throw 'Received an unknown channel name.';
}

/**
 * Gets the channel ID for channel name
 * @param {CHANNEL_NAMES} channelName Name of the channel
 * @returns {string} The channel ID
 */
export function getChannelIdForName(channelName) {
  if (isKnownChannelName(channelName))
    return CHANNEL_INFORMATION[channelName].id;

  // Should never go into this case
  throw 'Received an unknown channel name.';
}

/**
 * Gets the channel name based off its ID
 * @param {string} channelId ID of the channel
 * @returns {string | null} Name of the channel
 */
export function getChannelNameForId(channelId) {
  for (const [channelName, channelInfo] of Object.entries(
    CHANNEL_INFORMATION
  )) {
    if (channelInfo.id === channelId) return channelName;
  }

  // Should never go into this case
  // Avoid throwing error to prevent breaking bot
  console.error('Passed in a channel ID that we do not recognize.');
  return null;
}
