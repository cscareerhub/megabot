export const strings = {
  insufficientArguments: 'You need to supply a variable name and a new value.',
  successfullyUpdated: (oldVar, newVar) => `Updated ${oldVar} to ${newVar}.`,
  variableNotFound: (arg) => `Variable not found. Available options: ${arg}`
};
