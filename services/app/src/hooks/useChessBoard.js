import { useState } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board';
import { range } from '../helpers/array';

const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];

export const useChessBoard = () => {
  const [board, setBoard] = useState([
    ...range(NUMBER_OF_ROWS).map((_row, rowIndex) => [
      { attribute: NUMBER_OF_ROWS - rowIndex },
      ...range(NUMBER_OF_COLUMNS).map((_tile, tileIndex) => ({
        items: [],
        isFilled:
          (rowIndex % 2 && !(tileIndex % 2)) ||
          (!(rowIndex % 2) && tileIndex % 2),
      })),
    ]),
    [{}, ...range(6).map((key) => ({ attribute: alphabetArray[key] }))],
  ]);

  return [board, setBoard];
};
