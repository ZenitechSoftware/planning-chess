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
import { TurnType } from '../../domain/game';
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

  const figureMoveMessage = (
    turn: PlaceFigureMessage,
  ): ReceivedMessage<MessageType.FigureMoved> => {
    return {
      type: MessageType.FigureMoved,
      payload: turn,
    };
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

  it('should return false, when player has not moved, after the move should return true', () => {
    const connectedVoter = voterConnect();
    expect(
      gameService.playerHasPlacedFigure(roomId, connectedVoter.id),
    ).toBeFalsy();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    expect(
      gameService.playerHasPlacedFigure(roomId, connectedVoter.id),
    ).toBeTruthy();
  });

  it('should return all turns', () => {
    const figureMovedSpy = jest.spyOn(gameService, 'figureMoved');
    voterConnect();
    const turnsCount = gameRoomService.getTurns(roomId).length;
    expect(turnsCount).toBe(0);
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    const turnsAfterMoveCount = gameRoomService.getTurns(roomId).length;
    expect(turnsAfterMoveCount).toBe(1);
    expect(figureMovedSpy).toReturnWith([
      { ...testTurn, turnType: TurnType.FigurePlaced },
    ]);
  });

  it('should return a turn by player id', () => {
    voterConnect();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    const playerTurn = gameService.findMoveByPlayerId(roomId, playerTestId);
    expect(playerTurn).toEqual({
      ...testTurn,
      turnType: TurnType.FigurePlaced,
    });
  });

  it('should remove players turn', () => {
    voterConnect();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    const playerTurn = gameService.findMoveByPlayerId(roomId, playerTestId);
    expect(playerTurn).toEqual({
      ...testTurn,
      turnType: TurnType.FigurePlaced,
    });
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

  it('should remove players turn before marking player skipped move', () => {
    voterConnect();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    const playerTurn = gameService.findMoveByPlayerId(roomId, playerTestId);
    expect(playerTurn).toEqual({
      ...testTurn,
      turnType: TurnType.FigurePlaced,
    });
    const turnCount = gameRoomService.getTurns(roomId).length;
    expect(turnCount).toBe(1);

    gameService.moveSkipped(roomId, playerTestId);
    const playerTurnAfterSkip = gameService.findMoveByPlayerId(
      roomId,
      playerTestId,
    );
    expect(playerTurnAfterSkip).toEqual({
      id: playerTestId,
      turnType: TurnType.MoveSkipped,
    });
    const turnCountAfterSkip = gameRoomService.getTurns(roomId).length;
    expect(turnCountAfterSkip).toBe(1);
  });

  it('should return true if player has skipped the move', () => {
    voterConnect();
    gameService.moveSkipped(roomId, playerTestId);
    const playerTurnAfterSkip = gameService.findMoveByPlayerId(
      roomId,
      playerTestId,
    );
    expect(playerTurnAfterSkip).toEqual({
      id: playerTestId,
      turnType: TurnType.MoveSkipped,
    });
    const hasPlayerSkipped = gameService.playerHasSkipped(roomId, playerTestId);
    expect(hasPlayerSkipped).toBe(true);
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
    const turnsCount = gameRoomService.getTurns(roomId).length;
    expect(turnsCount).toBe(0);
    voterConnect();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
    const turnsCountAfterFirstMove = gameRoomService.getTurns(roomId).length;
    expect(turnsCountAfterFirstMove).toBe(1);

    playerService.newMessageReceived(ws, figureMoveMessage(anotherTestTurn));
    const turnsCountAfterSecondMove = gameRoomService.getTurns(roomId).length;
    expect(turnsCountAfterSecondMove).toBe(1);
  });

  it('should clear the board, setting turns to empty array', () => {
    voterConnect();
    playerService.newMessageReceived(ws, figureMoveMessage(testTurn));
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
