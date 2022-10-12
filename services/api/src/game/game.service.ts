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
  getTurns(roomId).push({ ...payload, score });
  return getTurns(roomId);
};

export const clearBoard = (roomId: string): void => {
  getTurns(roomId).length = 0;
};

export const findMoveByPlayerName = (
  roomId: string,
  name: string,
): PlaceFigureMessage | undefined =>
  getTurns(roomId).find((turn) => turn.player === name);

export const getBoard = (roomId: string): PlaceFigureMessage[] =>
  getTurns(roomId);
