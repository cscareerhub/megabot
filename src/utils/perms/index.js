import { GUILD_ID } from '../../constants';
import client from '../../client';

export const getMemberFromUser = async (user) => {
  const guild = await client.guilds.fetch(GUILD_ID);
  const member = await guild.members.fetch(user.id);
  return member;
};

export const getMemberFromMessage = (message) => {
  return (message || client.message).member;
};

export const findRole = (member, roleName) => {
  member.roles.cache.each((role) => {
    if (role.name === roleName) {
      return true;
    }
  });
  return false;
};

export const highestRole = (member) => {
  return member.roles && member.roles.highest;
};

export const isContributor = (member) => {
  return (
    member.roles &&
    (highestRole(member) === 'Contributor' || findRole(member, 'Contributor'))
  );
};

export const isMod = (member) => {
  return member.hasPermission('MANAGE_MESSAGES');
};

export const isAdmin = (member) => {
  return member.hasPermission('ADMINISTRATOR');
};
