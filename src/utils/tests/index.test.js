import addEvent from '../../bots/ama/subCommands/addEvent';
import client from '../../client';
import { defaultStrings } from '../../constants';
import listEvents from '../../bots/ama/subCommands/listEvents';
import { strings } from '../../bots/ama/constants';
import {
  commandHandler,
  dedent,
  escapedBackticks,
  getCommandsString,
  getModChannel,
  parseCommandString,
  partition
} from '../index';
import { get } from '../../environment';

describe('commandHandler', () => {
  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      },
      content: '++ama'
    };
  });

  const subCommands = { add: addEvent, list: listEvents };
  const expectedOutString = dedent(`${escapedBackticks}
    - add: Adds new event. Specify date then title of event.
    \t- Example: add 2020-01-01 Celebrate the best year to date\n
    - list: List all events. Add -i flag to see event IDs.
    \t- Example: list [-i]\n
    ${escapedBackticks}`);

  test('listing events - when no arguments provided', () => {
    commandHandler(subCommands, strings);
    expect(client.message.channel.send).toHaveBeenCalledWith(expectedOutString);
  });

  test('listing events - when invalid arguments provided', () => {
    client.message.content = '++ama idklol';
    commandHandler(subCommands, strings);
    expect(client.message.channel.send).toHaveBeenCalledWith(
      defaultStrings.invalidSubCommand(expectedOutString)
    );
  });
});

describe('utils', () => {
  beforeAll(async () => {
    client.message = {
      channel: {
        send: jest.fn()
      },
      content: '++command string'
    };

    client.prefix = '++';
  });

  test('dedent', () => {
    const string = `blah  blah
      blah`;
    expect(dedent(string)).toBe('blahblah\nblah');
  });

  test('getCommandsString', () => {
    const subCommands = {
      test: { example: 'test example', usage: 'test things' }
    };
    expect(getCommandsString(subCommands)).toBe(
      '```\n- test: test things\n\t- Example: test example\n\n```'
    );
  });

  test('parseCommandString', () => {
    expect(parseCommandString()).toEqual({
      arguments: [],
      subCommand: 'string'
    });
  });

  test('partition', () => {
    expect(partition(['a', 'b'], (e) => e === 'b')).toEqual([['b'], ['a']]);
  });
});
