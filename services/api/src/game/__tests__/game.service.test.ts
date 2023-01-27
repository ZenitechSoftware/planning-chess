import WebSocket from 'ws';
import * as playerService from '../../messaging/players.service';
import * as gameService from '../game.service';
import * as gameRoomService from '../game-room.service';
import {
  MessageType,
  PlaceFigureMessage,
  ReceivedMessage,
} from '../../domain/messages';
import logger from '../../logger';
import { voterConnect } from '../../testUtils/connectPlayer';
import { ws } from '../../testUtils/wsConnection';

jest.mock('ws');
jest.mock('../../logger');

describe('game.service', () => {
  const roomId = 'abcd-1234';
  const playerTestId = 'some-short-v4-uuid-1';
  const testTurn: PlaceFigureMessage = {
    row: 1,
    tile: 1,
    figure: 'rock',
    player: 'player1',
    id: playerTestId,
    score: 1,
  };
  const anotherTestTurn: PlaceFigureMessage = {
    row: 4,
    tile: 4,
    figure: 'rock',
    player: 'player1',
    id: playerTestId,
    score: 1,
  };

  beforeAll(() => {
    gameRoomService.getOrCreateRoom(roomId);
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    Object.defineProperty(ws, 'readyState', { value: WebSocket.OPEN });
  });

  afterEach(() => {
    jest.clearAllMocks();
    playerService.unsubscribe(ws);
    gameRoomService.getTurns(roomId).length = 0;
  });

  it('should return false, when player has not moved, after the move should return true', () => {
    const connectedVoter = voterConnect();
    const doesPlayerHaveMove = gameService.playerHasMove(
      roomId,
      connectedVoter.id,
    );
    expect(doesPlayerHaveMove).toBeFalsy();
    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
    playerService.newMessageReceived(ws, message);
    const doesPlayerHaveMoveAfterMove = gameService.playerHasMove(
      roomId,
      connectedVoter.id,
    );
    expect(doesPlayerHaveMoveAfterMove).toBeTruthy();
  });

  it('should return all turns', () => {
    const figureMovedSpy = jest.spyOn(gameService, 'figureMoved');
    voterConnect();
    const turnsCount = gameRoomService.getTurns(roomId).length;
    expect(turnsCount).toBe(0);
    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
    playerService.newMessageReceived(ws, message);
    const turnsAfterMove = gameRoomService.getTurns(roomId).length;
    expect(turnsAfterMove).toBe(1);
    expect(figureMovedSpy).toReturnWith([testTurn]);
  });

  it('should return a turn by player id', () => {
    voterConnect();
    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
    playerService.newMessageReceived(ws, message);
    const playerTurn = gameService.findMoveByPlayerId(roomId, playerTestId);
    expect(playerTurn).toMatchObject(testTurn);
  });

  it('should remove players turn', () => {
    voterConnect();
    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
    playerService.newMessageReceived(ws, message);
    const playerTurn = gameService.findMoveByPlayerId(roomId, playerTestId);
    expect(playerTurn).toMatchObject(testTurn);
    const turnCount = gameRoomService.getTurns(roomId).length;
    expect(turnCount).toBe(1);

    gameService.removeTurn(roomId, playerTestId);
    const playerTurnAfter = gameService.findMoveByPlayerId(
      roomId,
      playerTestId,
    );
    expect(playerTurnAfter).toBeUndefined();
    const turnCountAfter = gameRoomService.getTurns(roomId).length;
    expect(turnCountAfter).toBe(0);
  });

  it('should not remove players turn, because players turn does not exists', () => {
    const connectedPlayer = voterConnect({
      id: playerTestId,
    });
    const playerTurn = gameService.findMoveByPlayerId(
      roomId,
      connectedPlayer.id,
    );
    expect(playerTurn).toBeUndefined();
    expect(() => gameService.removeTurn(roomId, playerTestId)).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });

  it('should delete a player move, before assigning another move value', () => {
    const firstMoveMessage: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
    const secondMoveMessage: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: anotherTestTurn,
    };
    const turnsCount = gameRoomService.getTurns(roomId).length;
    expect(turnsCount).toBe(0);
    voterConnect();
    playerService.newMessageReceived(ws, firstMoveMessage);
    const turnsAfterFirstMove = gameRoomService.getTurns(roomId).length;
    expect(turnsAfterFirstMove).toBe(1);

    playerService.newMessageReceived(ws, secondMoveMessage);
    const turnsAfterSecondMove = gameRoomService.getTurns(roomId).length;
    expect(turnsAfterSecondMove).toBe(1);
  });

  it('should clear the board, setting turns to empty array', () => {
    voterConnect();
    const message: ReceivedMessage<MessageType.FigureMoved> = {
      type: MessageType.FigureMoved,
      payload: testTurn,
    };
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
});
