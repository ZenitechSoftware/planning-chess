import { PlaceFigureMessage } from '../domain/messages';
import { calculateScore } from '../helpers/calculate-score';
import * as gameService from './game-room.service';
import logger from '../logger';

const getTurns = (id: string) => gameService.getTurns(id);

export const figureMoved = (
  roomId: string,
  payload: PlaceFigureMessage,
): PlaceFigureMessage[] => {
  let score;
  if (payload !== null) {
    score = calculateScore(payload);
  }

  if (findMoveByPlayerId(roomId, payload.id)) {
    removeTurn(roomId, payload.id);
  }

  getTurns(roomId).push({ ...payload, score });
  return getTurns(roomId);
};

export const clearBoard = (roomId: string): void => {
  getTurns(roomId).length = 0;
};

export const findMoveByPlayerId = (
  roomId: string,
  id: string,
): PlaceFigureMessage | undefined =>
  getTurns(roomId).find((turn) => turn.id === id);

export const getBoard = (roomId: string): PlaceFigureMessage[] =>
  getTurns(roomId);

export const removeTurn = (roomId: string, playerId: string): void => {
  const turns = getTurns(roomId);
  try {
    const turnIndex = turns.findIndex((turn) => turn.id === playerId);
    if (turnIndex < 0) {
      throw new Error(`Player with ${playerId} id move could not be found`);
    }
    const copyOfTurns = [...turns];
    copyOfTurns.splice(turnIndex, 1);
    turns.splice(0, turns.length, ...copyOfTurns);
  } catch (err) {
    logger.error(err?.message);
  }
};
