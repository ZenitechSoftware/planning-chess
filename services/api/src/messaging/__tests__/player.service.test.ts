import WebSocket from 'ws';
import * as playerService from '../players.service';
import {
  MessageType,
  PlaceFigureMessage,
  ReceivedMessage,
  PlayerConnectedMessage,
} from '../../domain/messages';
import { PlayerStatus, PlayerRole } from '../../domain/player';
import * as gameService from '../../game/game.service';
import * as gameRoomService from '../../game/game-room.service';
import { GameWebSocket } from '../../domain/GameRoom';
import { getPlayerAvatarColor } from '../../helpers/player-avatar-color';

jest.mock('ws');
jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));
jest.mock('../../game/game.service');

describe('player.service', () => {
  const roomId = 'abcd-1234';
  const playerTestId = 'some-short-v4-uuid-0';
  const ws: GameWebSocket = new WebSocket('') as GameWebSocket;
  ws.roomId = roomId;

  beforeAll(() => {
    gameRoomService.getOrCreateRoom(roomId);
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    Object.defineProperty(ws, 'readyState', { value: WebSocket.OPEN });
    playerService.subscribe(ws, {
      id: 'testId',
      name: 'player1',
      color: getPlayerAvatarColor(),
      status: PlayerStatus.ActionNotTaken,
      role: PlayerRole.Voter,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    playerService.unsubscribe(ws);
  });

  it('should join a new player', () => {
    const message: ReceivedMessage<MessageType.PlayerConnected> = {
      type: MessageType.PlayerConnected,
      payload: { playerName: 'foo', id: playerTestId, role: PlayerRole.Voter },
    };

    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should not join the game, because another session is active', () => {
    const sendMessageSpy = jest.spyOn(playerService, 'sendMessage');
    const playerConnectedMessagePayload: PlayerConnectedMessage = {
      playerName: 'foo',
      id: playerTestId,
      role: PlayerRole.Voter,
    };

    playerService.playerConnected(ws, playerConnectedMessagePayload);
    playerService.playerConnected(ws, playerConnectedMessagePayload);

    expect(sendMessageSpy).toHaveBeenCalledWith(
      ws,
      MessageType.PlayerAlreadyExists,
    );
  });

  it('should skip a move for a player', () => {
    const payload = { userId: playerTestId };
    const message: ReceivedMessage<MessageType.MoveSkipped> = {
      type: MessageType.MoveSkipped,
      payload,
    };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should not skip a move, because user state is not ActionNotTaken', () => {
    const payload = { userId: playerTestId };
    const message: ReceivedMessage<MessageType.MoveSkipped> = {
      type: MessageType.MoveSkipped,
      payload,
    };
    playerService.newMessageReceived(ws, message);
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).not.toBeCalled();
  });

  it('should remove a player', () => {
    const payload = { userId: playerTestId };
    const message: ReceivedMessage<MessageType.RemovePlayer> = {
      type: MessageType.RemovePlayer,
      payload,
    };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).toBeCalled();
  });

  it('should not remove a player, because user do not exist', () => {
    const payload = { userId: playerTestId };
    const message: ReceivedMessage<MessageType.RemovePlayer> = {
      type: MessageType.RemovePlayer,
      payload,
    };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock).not.toBeCalled();
  });

  it('should set a turn if user`s move already exist', () => {
    const turnValue: PlaceFigureMessage = {
      row: 2,
      tile: 5,
      figure: 'rook',
      player: 'player1',
      id: playerTestId,
      score: 8,
    };

    jest.spyOn(gameService, 'findMoveByPlayerId').mockReturnValue(turnValue);
    const sendMock = jest.spyOn(ws, 'send');
    playerService.checkIfUserAlreadyExists(ws);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should move a chess figure', () => {
    const payload = {
      row: 2,
      tile: 5,
      figure: 'rook',
      player: 'player1',
      id: playerTestId,
      score: 8,
    };

    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload,
    };
    const sendMock = jest.spyOn(ws, 'send');
    playerService.newMessageReceived(ws, message);
    expect(sendMock.mock.calls).toMatchSnapshot();
    expect(gameService.figureMoved).toBeCalledWith(roomId, payload);
  });

  it('should clear the board', async () => {
    const sendMock = jest.spyOn(ws, 'send');
    playerService.clearBoard(ws);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should not skip a move, because user do not exist', () => {
    const payload = { userId: playerTestId };
    const message: ReceivedMessage<MessageType.MoveSkipped> = {
      type: MessageType.MoveSkipped,
      payload,
    };

    const publishMessageSpy = jest.spyOn(playerService, 'publish');
    const mock = jest
      .spyOn(gameRoomService, 'getPlayers')
      .mockReturnValue(null);
    playerService.newMessageReceived(ws, message);
    expect(publishMessageSpy).not.toBeCalledWith(ws, MessageType.MoveSkipped);
    mock.mockRestore();
  });

  it('should disconnect a player', async () => {
    const sendMock = jest.spyOn(ws, 'send');
    playerService.playerDisconnected(ws);
    expect(sendMock.mock.calls).toMatchSnapshot();
  });

  it('should unsubscribe twice without crash', async () => {
    playerService.unsubscribe(ws);
    playerService.unsubscribe(ws);
  });
});
