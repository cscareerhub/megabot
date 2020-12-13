import * as permUtils from '../perms';

describe('perms', () => {
  let mockMember = {
    fetch: jest.fn().mockImplementation(() => {}),
    hasPermission: jest.fn().mockImplementation(() => false),
    roles: {
      cache: {
        each: jest.fn()
      },
      highest: { name: 'Contributor' }
    }
  };
  const message = {
    member: {}
  };

  test('getMemberFromMessage', () => {
    const member = permUtils.getMemberFromMessage(message);
    expect(member).toEqual({});
  });

  // test('findRole', () => {
  //   const hasRole = permUtils.findRole(mockMember, 'Contributor');
  //   expect(hasRole).toBe(true);
  // });

  test('highestRole', () => {
    const highestRole = permUtils.highestRole(mockMember);
    expect(highestRole.name).toBe('Contributor');
  });

  test('isContributor', () => {
    const isContributor = permUtils.isContributor(mockMember);
    expect(isContributor).toBe(true);
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
