import addEvent from '../../bots/ama/subCommands/addEvent';
import client from '../../client';
import { getStrings } from '../../bots/ama/constants';
import listEvents from '../../bots/ama/subCommands/listEvents';
import { commandHandler, dedent, escapedBackticks } from '../index';

describe('commandHandler', () => {
  const subCommands = { add: addEvent, list: listEvents };
<<<<<<< HEAD
  const expectedOutString = `${escapedBackticks}
- add: Adds new event. Specify date then title of event
\t- Example: add 2020-01-01 Celebrate the best year to date\n
- list: List all events. Add -i flag to see event IDs.
\t- Example: list [-i]\n
${escapedBackticks}`;

  test('when no arguments provided', () => {
    // When
=======
  const expectedOutString = dedent(`${escapedBackticks}
    - add: Specify date then title of event
    \t- Example: add 01/01/2020 Celebrate the best year to date\n
    - list: List all events
    \t- Example: list\n
    ${escapedBackticks}`);

  test('listing events - when no arguments provided', () => {
>>>>>>> master
    commandHandler(subCommands, getStrings());
    expect(client.message.channel.send).toHaveBeenCalledWith(expectedOutString);
  });

  test('listing events - when invalid arguments provided', () => {
    client.message.content = '++ama idklol';
    commandHandler(subCommands, getStrings());
    expect(client.message.channel.send).toHaveBeenCalledWith(
      `Invalid argument. Following arguments are permitted:\n${expectedOutString}`
    );
  });

  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      },

      content: '++ama'
    };
  });
});
