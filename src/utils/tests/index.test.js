import addEvent from '../../bots/ama/subCommands/addEvent';
import client from '../../client';
import { getStrings } from '../../bots/ama/constants';
import listEvents from '../../bots/ama/subCommands/listEvents';
import { commandHandler, escapedBackticks } from '../index';

describe('listing events', () => {
  const subCommands = { add: addEvent, list: listEvents };
  const expectedOutString = `${escapedBackticks}
- add: Specify date then title of event
\t- Example: add 01/01/2020 Celebrate the best year to date\n
- list: List all events
\t- Example: list\n
${escapedBackticks}`;

  test('when no arguments provided', () => {
    // When
    commandHandler(subCommands, getStrings());

    // Then
    expect(client.message.channel.send).toHaveBeenCalledWith(expectedOutString);
  });

  test('when invalid arguments provided', () => {
    // Given
    client.message.content = '++ama idklol';

    // When
    commandHandler(subCommands, getStrings());

    // Then
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
