import { VALID_FORMATS } from './constants';

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
