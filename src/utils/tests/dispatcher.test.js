import client from '../../client';
import { parseMessage } from '../../dispatcher';

describe('parseMessage', () => {
  test('client emits command event when command is valid', () => {
    const emitterSpy = jest.spyOn(client, 'emit');
    parseMessage('++faq');
    expect(emitterSpy).toHaveBeenCalledWith('faq');

    parseMessage('++pins list');
    expect(emitterSpy).toHaveBeenCalledWith('pins');
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
