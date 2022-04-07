import { PlaceFigureMessage } from '../domain/messages';

interface NumberObjects {
  [index: number]: number;
}

interface StringObjects {
  [index: string]: number;
}

const defaultPayload = {
  row: 0,
  tile: 0,
  figure: '',
};

export const calculateScore = (payload: PlaceFigureMessage) => {
  const NUMBER_OF_ROWS = 6;
  const {
    row,
    tile: column,
    figure: selectedPiece,
  } = payload || defaultPayload;
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

  const xScore = xValueToScoreMap[NUMBER_OF_ROWS - row];
  const yScore = yValueToScoreMap[column];
  const pieceScore = pieceToScoreMap[selectedPiece];

  return xScore + yScore + pieceScore;
};
