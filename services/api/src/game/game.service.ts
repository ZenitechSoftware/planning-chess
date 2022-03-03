import { PlaceFigureMessage } from '../domain/messages';

export const turns: PlaceFigureMessage[] = [];

export const figureMoved = (
  payload: PlaceFigureMessage,
): PlaceFigureMessage[] => {
  turns.push(payload);
  return turns;
};

export const clearBoard = (): void => {
  turns.length = 0;
};
