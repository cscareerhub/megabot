import { Util } from 'discord.js';
import { VALID_FORMATS } from './constants';
import { defaultStrings } from './constants';

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
