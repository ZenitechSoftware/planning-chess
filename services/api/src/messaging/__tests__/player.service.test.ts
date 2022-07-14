import WebSocket from 'ws';
import * as playerService from '../players.service';
import { MessageType } from '../../domain/messages';
import * as gameService from '../../game/game.service';

jest.mock('ws');
jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));
jest.mock('../../game/game.service');

describe('player.service', () => {
  const ws = new WebSocket('');
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    Object.defineProperty(ws, 'readyState', { value: WebSocket.OPEN });
    playerService.subscribe(ws, { playerName: 'player1' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    playerService.unsubscribe(ws);
  });

  it('should join a new player', () => {
    const message = {
      type: MessageType.PlayerConnected,
      payload: { playerName: 'foo' },
    };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should skip a move for a player', () => {
    const payload = { userId: 'some-short-v4-uuid-0' };
    const message = { type: MessageType.MoveSkipped, payload };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should not skip a move, because user do not exist', () => {
    const payload = { userId: 'some-short-v4-' };
    const message = { type: MessageType.MoveSkipped, payload };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).not.toBeCalled();
  });

  it('should not skip a move, because user state is not ActionNotTaken', () => {
    const payload = { userId: 'some-short-v4-uuid-0' };
    const message = { type: MessageType.MoveSkipped, payload };
    playerService.newMessageReceived(ws, message);
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).not.toBeCalled();
  });

  it('should remove a player', () => {
    const payload = { userId: 'some-short-v4-uuid-0' };
    const message = { type: MessageType.RemovePlayer, payload };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).toBeCalled();
  });

  it('should not remove a player, because user do not exist', () => {
    const payload = { userId: 'some-short-v4-' };
    const message = { type: MessageType.RemovePlayer, payload };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).not.toBeCalled();
  });

  it('should set a turn if user`s move already exist', () => {
    const sendMock = jest.spyOn(ws, 'send');
    playerService.checkIfUserAlreadyExists(ws);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should move a chess figure', () => {
    const payload = { move: 'test' };
    const message = { type: MessageType.FigureMoved, payload };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
    expect(gameService.figureMoved).toBeCalledWith(payload);
  });

  it('should clear the board', async () => {
    const sendMock = jest.spyOn(ws, 'send');
    playerService.clearBoard();
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should disconnect a player', async () => {
    const sendMock = jest.spyOn(ws, 'send');
    playerService.playerDisconnected();
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should unsubscribe twice without crash', async () => {
    playerService.unsubscribe(ws);
    playerService.unsubscribe(ws);
  });
});
