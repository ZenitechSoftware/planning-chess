import { PlaceFigureMessage } from '../domain/messages';
import { calculateAverage, roundUp } from '@planning-chess/shared';

interface NumberObjects {
  [index: number]: number;
}

interface StringObjects {
  [index: string]: number;
}

const defaultMoveValues = {
  row: 0,
  tile: 0,
  figure: '',
};

const xValueToScoreMap: NumberObjects = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 13,
};

const yValueToScoreMap: NumberObjects = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 13,
};

const pieceToScoreMap: StringObjects = {
  pawn: 1,
  knight: 2,
  bishop: 3,
  rook: 5,
  king: 8,
  queen: 13,
};

export const calculateScore = (moveValues: PlaceFigureMessage): number => {
  const NUMBER_OF_ROWS = 6;
  const {
    row,
    tile: column,
    figure: selectedPiece,
  } = moveValues || defaultMoveValues;

  const moveValueArray: number[] = [];
  moveValueArray.push(xValueToScoreMap[NUMBER_OF_ROWS - row]);
  moveValueArray.push(yValueToScoreMap[column]);
  moveValueArray.push(pieceToScoreMap[selectedPiece]);
  const avg = calculateAverage(moveValueArray);
  return roundUp(avg);
};
