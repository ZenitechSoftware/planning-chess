import { useState } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board';
import { range } from '../helpers/array';

const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];

export const useChessBoard = () => {
  const defaultBoard = [
    ...range(NUMBER_OF_ROWS).map((_row, rowIndex) => [
      { attribute: NUMBER_OF_ROWS - rowIndex},
      ...range(NUMBER_OF_COLUMNS).map((_tile, tileIndex) => ({
        items: [],
        filled:
          (rowIndex % 2 && !(tileIndex % 2)) ||
          (!(rowIndex % 2) && tileIndex % 2),
      })),
    ]),
    [{}, ...range(6).map((key) => ({ attribute: alphabetArray[key] }))],
  ];
  const [board, setBoard] = useState(defaultBoard);

  return { board, setBoard, defaultBoard };
};
