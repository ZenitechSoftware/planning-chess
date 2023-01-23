import { PlaceFigureMessage } from '../domain/messages';
import { calculateScore } from '../helpers/calculate-score';
import * as gameService from './game-room.service';

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
  const turnIndex = turns.findIndex((turn) => turn.id === playerId);
  turns.splice(turnIndex, 1);
};
