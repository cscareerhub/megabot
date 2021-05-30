import client from '../client';
import { defaultStrings } from '../constants';
import { get } from '../environment';

/**
 * Find a role in a member's list of roles
 * @param {Object.<string, any>} member - the GuideMember object
 * @param {string} roleName - the name of the role
 * @param {boolean} approx - if true searches with 'endsWith'. '===' otherwise
 * @return {boolean} - whether or not the user has the role
 */
export const findRole = (member, roleName, approx = false) => {
  return member.roles.cache.some(
    (role) => (approx && role.name.endsWith(roleName)) || role.name === roleName
  );
};

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
 * Gets the highest role of a member
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {Object.<string, any>} - the member's highest role
 */
export const highestRole = (member) => {
  return member.roles?.highest;
};

/**
 * Sends a message if GuildMember is not a Mod
 * @returns {boolean} - whether or not the member has insufficient permissions
 */
export const insufficientPermissionsAlert = () => {
  if (!checkRuleList(getMemberFromMessage(), [isMod])) {
    client.message.author.send(defaultStrings.insufficientPermissions);
    return true;
  }

  return false;
};

/**
 * Checks a rule list for a member and returns true if at least one rule applies.
 * Default rule set is [isMod, isContributor, isAdmin].
 *
 * @param {Object.<string, any>} member - the GuildMember object
 * @param {Array.<function>} rules - rules to be applied to a member
 * @returns
 */
export const checkRuleList = (
  member,
  rules = [isMod, isContributor, isAdmin]
) => {
  return rules.some((rule) => rule(member));
};

/**
 * Checks if GuildMember is a Admin
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {boolean} - whether or not the member has Admin permissions
 */
export const isAdmin = (member) => {
  return member.hasPermission('ADMINISTRATOR');
};

/**
 * Checks if GuildMember is a Contributor
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {boolean} - whether or not the member has the Contributor role
 */
export const isContributor = (member) => {
  return (
    member.roles &&
    (highestRole(member).name.endsWith('Contributor') ||
      findRole(member, 'Contributor', true))
  );
};

/**
 * Checks if GuildMember is a Mod
 * @param {Object.<string, any>} member - the GuildMember object
 * @returns {boolean} - whether or not the member has Mod permissions
 */
export const isMod = (member) => {
  return member.hasPermission('MANAGE_MESSAGES');
};
