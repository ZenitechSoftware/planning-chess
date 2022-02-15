import { useState } from 'react';
import { numberOfRows, numberOfColumns } from '../constants/board';

const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];

export const useChessBoard = () => {
  const [board, setBoard] = useState(
    [...Array(numberOfRows + 1).keys()].map((_row, rowIndex) =>
      [...Array(numberOfColumns + 1).keys()].map((_tile, tileIndex) => ({
        attribute:
          tileIndex === 0 && rowIndex !== numberOfRows
            ? numberOfColumns - rowIndex
            : tileIndex !== 0 && rowIndex === numberOfRows
            ? alphabetArray[tileIndex - 1]
            : null,
        items: [],
        isFilled:
          tileIndex !== 0 && rowIndex !== numberOfRows
            ? (rowIndex % 2 && !(tileIndex % 2)) ||
              (!(rowIndex % 2) && tileIndex % 2)
            : null,
      })),
    ),
  );

  return [board, setBoard];
};
