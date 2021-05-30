import { Collection } from 'discord.js';
import * as permUtils from '../perms';

describe('perms', () => {
  let mockMember = {
    fetch: jest.fn().mockImplementation(() => {}),
    hasPermission: jest.fn().mockImplementation(() => false),
    roles: {
      cache: {
        some: jest.fn()
      },
      highest: { name: 'Contributor' }
    }
  };

  let mockServerContributor = {
    fetch: jest.fn().mockImplementation(() => {}),
    hasPermission: jest.fn().mockImplementation(() => false),
    roles: {
      cache: new Collection(),
      highest: { name: 'CEO' }
    }
  };

  let mockFakeContributor = {
    fetch: jest.fn().mockImplementation(() => {}),
    hasPermission: jest.fn().mockImplementation(() => false),
    roles: {
      cache: new Collection(),
      highest: { name: 'Contributor Fake' }
    }
  };

  const message = {
    member: {}
  };

  test('getMemberFromMessage', () => {
    const member = permUtils.getMemberFromMessage(message);
    expect(member).toEqual({});
  });

  test('highestRole', () => {
    const highestRole = permUtils.highestRole(mockMember);
    expect(highestRole.name).toBe('Contributor');
  });

  test('isContributor', () => {
    const isContributor = permUtils.isContributor(mockMember);
    expect(isContributor).toBe(true);
  });

  test('isCommunityContributor', () => {
    mockServerContributor.roles.cache.set('Commpunity Contributor', {
      name: 'Commpunity Contributor'
    });

    const isContributor = permUtils.isContributor(mockServerContributor);
    expect(isContributor).toBe(true);
  });

  test('isContributorFake', () => {
    const isContributor = permUtils.isContributor(mockFakeContributor);
    expect(isContributor).toBe(false);
  });

  test('isMod', () => {
    const isMod = permUtils.isMod(mockMember);
    expect(isMod).toBe(false);
    mockMember.hasPermission = jest.fn().mockImplementation(() => true);
    const isModTrue = permUtils.isMod(mockMember);
    expect(isModTrue).toBe(true);
  });

  test('isAdmin', () => {
    mockMember.hasPermission = jest.fn().mockImplementation(() => false);
    const isAdminFalse = permUtils.isAdmin(mockMember);
    expect(isAdminFalse).toBe(false);
    mockMember.hasPermission = jest.fn().mockImplementation(() => true);
    const isAdminTrue = permUtils.isAdmin(mockMember);
    expect(isAdminTrue).toBe(true);
  });
});
