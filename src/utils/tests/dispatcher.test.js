import client from '../../client';
import { dispatchCmd, parseMessage } from '../dispatcher';

describe('parseMessage', () => {
  test('client emits command event when command is valid', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    parseMessage('++faq');
    expect(emitterSpy).toHaveBeenCalledWith('command', 'faq', [], '++faq');
    parseMessage('++pins list');
    expect(emitterSpy).toHaveBeenCalledWith('command', 'pins', ['list'], '++pins list');
  });

  test('client does not emit command event when command is not valid', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    parseMessage('++invalid');
    expect(emitterSpy).not.toHaveBeenCalled();
  });

  test('client does not emit command event when prefix is not correct', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    parseMessage('+faq');
    expect(emitterSpy).not.toHaveBeenCalled();
  });
});

describe('dispatchCmd', () => {
  test('dispatches event with empty array', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    dispatchCmd('faq', [], '++faq');
    expect(emitterSpy).toHaveBeenCalledWith('faq', [], '++faq');
  });

  test('dispatches faq event and args', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    dispatchCmd('faq', ['LC'], '++faq LC');
    expect(emitterSpy).toHaveBeenCalledWith('faq', ['LC'], '++faq LC');
  });

  test('dispatches pins event and args', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    dispatchCmd('pins', ['list'], '++pins list');
    expect(emitterSpy).toHaveBeenCalledWith('pins', ['list'], '++pins list');
  });
});
