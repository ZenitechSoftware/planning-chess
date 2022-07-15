import { PlaceFigureMessage } from '../domain/messages';
import { calculateScore } from '../helpers/calculateScore';

export const turns: PlaceFigureMessage[] = [];

export const figureMoved = (
  payload: PlaceFigureMessage,
): PlaceFigureMessage[] => {
  let score;
  if (payload !== null) {
    score = calculateScore(payload);
  }
  turns.push({ ...payload, score });
  return turns;
};

export const clearBoard = (): void => {
  turns.length = 0;
};

export const findMoveByPlayerName = (
  name: string,
): PlaceFigureMessage | undefined => turns.find((turn) => turn.player === name);

export const getBoard = (): PlaceFigureMessage[] => turns;
