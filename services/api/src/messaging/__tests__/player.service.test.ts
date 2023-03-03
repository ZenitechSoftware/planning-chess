import WebSocket from 'ws';
import * as playerService from '../players.service';
import {
  MessageType,
  PlaceFigureMessage,
  ReceivedMessage,
} from '../../domain/messages';
import { PlayerStatus, PlayerRole } from '../../domain/player';
import * as gameRoomService from '../../game/game-room.service';
import { voterConnect, spectatorConnect } from '../../testUtils/connectPlayer';
import { ws } from '../../testUtils/wsConnection';
import {
  getFigureMovedMessage,
  getMoveSkippedMessage,
} from '../../testUtils/messages';

jest.mock('ws');
jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));

describe('player.service', () => {
  const roomId = 'abcd-1234';
  const playerTestId = 'some-short-v4-uuid-1';
  const spectatorTestId = 'some-short-v4-uuid-2';
  const testUrl = 'some-test-url';

  const testTurn: PlaceFigureMessage = {
    row: 1,
    tile: 1,
    figure: 'rock',
    player: 'player1',
    playerId: playerTestId,
    score: 1,
  };

  beforeAll(() => {
    gameRoomService.getOrCreateRoom(roomId);
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    Object.defineProperty(ws, 'readyState', { value: WebSocket.OPEN });
  });

  afterEach(() => {
    jest.clearAllMocks();
    playerService.resetGame(ws);
    playerService.unsubscribe(ws);
  });

  describe('player connect', () => {
    it('should join new player', () => {
      voterConnect();
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player).toBeDefined();
    });

    it('should not join the game, because another session is active', () => {
      const sendMessageSpy = jest.spyOn(playerService, 'sendMessage');
      voterConnect();
      voterConnect();

      expect(sendMessageSpy).toHaveBeenCalledWith(
        ws,
        MessageType.PlayerAlreadyExists,
      );
    });

    it('should create new id and assign voter role to player on connect', () => {
      const message: ReceivedMessage<MessageType.PlayerConnected> = {
        type: MessageType.PlayerConnected,
        payload: { playerName: 'player1', id: '', role: null, avatar: null },
      };
      const messageSpy = jest.spyOn(playerService, 'subscribe');
      playerService.newMessageReceived(ws, message);
      expect(messageSpy).toBeCalledWith(
        ws,
        expect.objectContaining({
          id: 'some-short-v4-uuid-0',
          role: PlayerRole.Voter,
        }),
      );
    });

    it('should set player status to ActionNotTaken on connection', () => {
      voterConnect();
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.ActionNotTaken);
    });

    it('should set player status to FigurePlaced after he re-logs after making a move ', () => {
      voterConnect();
      const message = getFigureMovedMessage(testTurn);
      playerService.newMessageReceived(ws, message);
      playerService.unsubscribe(ws);
      voterConnect();
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.FigurePlaced);
    });

    it('should set player status to MoveSkipped after he re-logs after skipping a move ', () => {
      voterConnect();
      const message = getMoveSkippedMessage(playerTestId);
      playerService.newMessageReceived(ws, message);
      playerService.unsubscribe(ws);
      voterConnect();
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.MoveSkipped);
    });

    it('should disconnect a player', () => {
      voterConnect();
      const playersCount = gameRoomService.getPlayers(roomId)?.size;
      expect(playersCount).toBe(1);
      playerService.unsubscribe(ws);
      const playersCountAfterOneDisconnect =
        gameRoomService.getPlayers(roomId)?.size;
      expect(playersCountAfterOneDisconnect).toBe(0);
    });
  });

  describe('player actions', () => {
    it('should mark player status as FigurePlaced after he makes a move', () => {
      voterConnect();
      const message = getFigureMovedMessage(testTurn);
      playerService.newMessageReceived(ws, message);
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.FigurePlaced);
    });

    it('should mark player status to MoveSkipped after he skips a move', () => {
      voterConnect();
      const message = getMoveSkippedMessage(playerTestId);
      playerService.newMessageReceived(ws, message);
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.MoveSkipped);
    });

    it('should change player status from FigurePlaced to MoveSkipped', () => {
      voterConnect();
      const moveMessage = getFigureMovedMessage(testTurn);
      playerService.newMessageReceived(ws, moveMessage);
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].status).toBe(PlayerStatus.FigurePlaced);

      const skipMessage = getMoveSkippedMessage(playerTestId);
      playerService.newMessageReceived(ws, skipMessage);
      const playerAfterSkip = playerService.findPlayerById(
        roomId,
        playerTestId,
      );
      expect(playerAfterSkip[1].status).toBe(PlayerStatus.MoveSkipped);
    });
  });

  describe('errors', () => {
    it('should send an error message, because spectator tried to skip his move', () => {
      spectatorConnect();
      const message = getMoveSkippedMessage(spectatorTestId);
      playerService.newMessageReceived(ws, message);
    });

    it('should not skip a move, because player does not exist', () => {
      voterConnect();
      const message = getMoveSkippedMessage(`${playerTestId}2`);
      playerService.newMessageReceived(ws, message);
      const messageSpy = jest.spyOn(playerService, 'publish');
      expect(messageSpy).not.toBeCalled();
    });

    it('should send an error message, because handler could not be found', () => {
      voterConnect();
      const message = {
        type: 'Invalid message',
      };
      const getHandlerSpy = jest.spyOn(playerService, 'getHandler');
      const errorHandlerSpy = jest.spyOn(playerService, 'errorHandler');
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      //@ts-ignore
      playerService.newMessageReceived(ws, message);
      expect(getHandlerSpy).toReturnWith(undefined);
      expect(errorHandlerSpy).toBeCalled();
    });
  });

  it('should ping player back', () => {
    voterConnect();
    const message: ReceivedMessage<MessageType.Ping> = {
      type: MessageType.Ping,
    };
    const sendMessageSpy = jest.spyOn(playerService, 'sendMessage');
    playerService.newMessageReceived(ws, message);
    expect(sendMessageSpy).toHaveBeenCalledWith(ws, MessageType.Pong);
  });

  it('should reset the game', () => {
    voterConnect();
    const message = getFigureMovedMessage(testTurn);
    playerService.newMessageReceived(ws, message);
    const turnsCount = gameRoomService.getTurns(roomId).length;
    expect(turnsCount).toBe(1);
    const resetGameMessage: ReceivedMessage<MessageType.ClearBoard> = {
      type: MessageType.ClearBoard,
    };
    playerService.newMessageReceived(ws, resetGameMessage);
    const turnsCountAfterReset = gameRoomService.getTurns(roomId).length;
    expect(turnsCountAfterReset).toBe(0);
  });

  describe('avatar update', () => {
    it('should update player avatar', () => {
      voterConnect();
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].avatar).toBe(undefined);

      const avatarUpdateMessage: ReceivedMessage<MessageType.AvatarUpdate> = {
        type: MessageType.AvatarUpdate,
        payload: { url: testUrl },
      };
      playerService.newMessageReceived(ws, avatarUpdateMessage);

      const playerAfterUpdate = playerService.findPlayerById(
        roomId,
        playerTestId,
      );
      expect(playerAfterUpdate[1].avatar).toBe(testUrl);
    });

    it('should delete player avatar', () => {
      voterConnect({
        avatar: 'someUrl',
      });
      const player = playerService.findPlayerById(roomId, playerTestId);
      expect(player[1].avatar).toBe('someUrl');

      playerService.newMessageReceived(ws, {
        type: MessageType.AvatarUpdate,
        payload: { url: undefined },
      });
      const playerAfterUpdate = playerService.findPlayerById(
        roomId,
        playerTestId,
      );
      expect(playerAfterUpdate[1].avatar).toBe(undefined);
    });
  });

  describe('getHandler', () => {
    it.each([
      [MessageType.ClearBoard, PlayerRole.Spectator, playerService.resetGame],
      [MessageType.FigureMoved, PlayerRole.Spectator, undefined],
      [
        MessageType.MoveSkipped,
        PlayerRole.Spectator,
        playerService.moveSkipped,
      ],
      [MessageType.ClearBoard, PlayerRole.Spectator, playerService.resetGame],
      [MessageType.Ping, PlayerRole.Spectator, playerService.ping],
      [
        MessageType.PlayerConnected,
        PlayerRole.Spectator,
        playerService.playerConnected,
      ],

      [MessageType.ClearBoard, PlayerRole.Voter, playerService.resetGame],
      [MessageType.FigureMoved, PlayerRole.Voter, playerService.figureMoved],
      [MessageType.MoveSkipped, PlayerRole.Voter, playerService.moveSkipped],
      [MessageType.ClearBoard, PlayerRole.Voter, playerService.resetGame],
      [MessageType.Ping, PlayerRole.Voter, playerService.ping],
      [
        MessageType.PlayerConnected,
        PlayerRole.Voter,
        playerService.playerConnected,
      ],

      [MessageType.ClearBoard, undefined, undefined],
      [MessageType.FigureMoved, undefined, undefined],
      [MessageType.MoveSkipped, undefined, undefined],
      [MessageType.ClearBoard, undefined, undefined],
      [MessageType.Ping, undefined, playerService.ping],
      [MessageType.PlayerConnected, undefined, playerService.playerConnected],
    ])(
      'returns correct handler when message type is %s and role is %s',
      (messageType, role, expectedHandler) => {
        const handler = playerService.getHandler(messageType, role);
        expect(handler).toBe(expectedHandler);
      },
    );
  });
});
