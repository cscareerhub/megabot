export const strings = {
  channelCreated: (user) => `${user} has recreated this channel`,
  channelNotCreated: 'Channel could not be created. Please try again',
  insufficientArguments: 'You need to supply a variable name and a new value.',
  successfullyUpdated: (oldVar, newVar) =>
    `The ${oldVar} has been updated to ${newVar}.`,
  variableNotFound: (arg) => `Variable not found. Available options: ${arg}`
};
