import { PlaceFigureMessage } from '../domain/messages';
import { calculateScore } from '../helpers/calculate-score';
import * as gameRoomService from './game-room.service';
import logger from '../logger';

export const playerHasMove = (roomId: string, playerId: string): boolean =>
  Boolean(findMoveByPlayerId(roomId, playerId));

export const playerHasSkipped = (roomId: string, playerId: string): boolean =>
  Boolean(gameRoomService.getSkippedPlayers(roomId).find(player => player.userId === playerId));

export const figureMoved = (
  roomId: string,
  payload: PlaceFigureMessage,
): PlaceFigureMessage[] => {
  let score;
  if (payload !== null) {
    score = calculateScore(payload);
  }

  if (playerHasMove(roomId, payload.id)) {
    removeTurn(roomId, payload.id);
  }

  gameRoomService.getTurns(roomId).push({ ...payload, score });
  return gameRoomService.getTurns(roomId);
};

export const clearBoard = (roomId: string): void => {
  gameRoomService.getTurns(roomId).length = 0;
};

export const findMoveByPlayerId = (
  roomId: string,
  id: string,
): PlaceFigureMessage | undefined =>
  gameRoomService.getTurns(roomId).find((turn) => turn.id === id);

export const getBoard = (roomId: string): PlaceFigureMessage[] =>
  gameRoomService.getTurns(roomId);

export const removeTurn = (roomId: string, playerId: string): void => {
  const turns = gameRoomService.getTurns(roomId);
  try {
    const turnIndex = turns.findIndex((turn) => turn.id === playerId);
    if (turnIndex < 0) {
      throw new Error(`Player with ${playerId} id move could not be found`);
    }
    turns.splice(turnIndex, 1);
  } catch (err) {
    logger.error(err?.message);
  }
};
