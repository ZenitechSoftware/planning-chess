import { NUMBER_OF_ROWS} from '../constants/board';

export function calculateTheScore (row, column, selectedPiece) {
    const xValueToScoreMap = {
      1: 1,
      2: 2,
      3: 3,
      4: 5,
      5: 8,
      6: 13,
    };
    const yValueToScoreMap = {
      1: 1,
      2: 2,
      3: 3,
      4: 5,
      5: 8,
      6: 13,
    };

    const pieceToScoreMap = {
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
}
