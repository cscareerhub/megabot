import client from '../client';
import { get } from '../environment';

/**
 * Get GuildMember from User object using guild ID and user ID
 * @param {Object.<string, any>} user - a User object
 * @return {Object.<string, any>} - the GuildMember
 */
export const getMemberFromUser = async (user) => {
  const guild = await client.guilds.fetch(get('GUILD_ID'));
  const member = await guild.members.fetch(user.id);
  return member;
};

/**
 * Get GuildMember from Message object
 * @param {Object.<string, any>} message - a Message object
 * @return {Object.<string, any>} - the GuildMember
 */
export const getMemberFromMessage = (message) => {
  return (message || client.message).member;
};

/**
 * Find a role in a member's list of roles
 * @param {Object.<string, any>} member - the GuideMember object
 * @param {string} roleName - the name of the role
 * @return {boolean} - whether or not the user has the role
 */
export const findRole = (member, roleName) => {
  member.roles.cache.each((role) => {
    if (role.name === roleName) {
      return true;
    }
  });
};

/**
 * Gets the highest role of a member
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {Object.<string, any>} - the member's highest role
 */
export const highestRole = (member) => {
  return member.roles?.highest;
};

/**
 * Checks if GuildMember is a Contributor
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {boolean} - whether or not the member has the Contributor role
 */
export const isContributor = (member) => {
  return (
    member.roles &&
    (highestRole(member).name === 'Contributor' ||
      findRole(member, 'Contributor'))
  );
};

/**
 * Checks if GuildMember is a Mod
 * @param {Object.<string, any>} member - the GuildMember object
 * * @returns {boolean} - whether or not the member has Mod permissions
 */
export const isMod = (member) => {
  return member.hasPermission('MANAGE_MESSAGES');
};

/**
 * Checks if GuildMember is a Admin
 * @param {Object.<string, any>} member - the GuildMember object
 * * @returns {boolean} - whether or not the member has Admin permissions
 */
export const isAdmin = (member) => {
  return member.hasPermission('ADMINISTRATOR');
};
