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

export const findMoveByPlayerName = (
  name: string,
): PlaceFigureMessage | undefined => turns.find((turn) => turn.player === name);
