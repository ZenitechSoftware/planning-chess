import { useState } from 'react';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../constants/board';
import { range } from '../helpers/array';
import { getPieceScore } from '../helpers/getPieceScore';

const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];
const pointsArray = [1, 2, 3, 5, 8, 13];

export const useChessBoard = () => {
  const defaultBoard = [
    ...range(NUMBER_OF_ROWS).map((_row, rowIndex) => [
      { attribute: NUMBER_OF_ROWS - rowIndex, points: pointsArray[pointsArray.length - 1 - rowIndex] },
      ...range(NUMBER_OF_COLUMNS).map((_tile, tileIndex) => ({
        items: [],
        filled:
          (rowIndex % 2 && !(tileIndex % 2)) ||
          (!(rowIndex % 2) && tileIndex % 2),
      })),
    ]),
    [{}, ...range(6).map((key) => ({ attribute: alphabetArray[key], points: pointsArray[key] }))],
  ];
  const [board, setBoard] = useState(defaultBoard);

  const clearChessBoard = () => {
    setBoard(defaultBoard);
  }

  const clearChessBoardTile = (row, tile) => {
    const copyOfBoard = [...board];
    copyOfBoard[row][tile].items = [];
    setBoard(copyOfBoard);
  }

  const insertFigureIntoBoard = ({ row, tile, figureName, playerId, playerName }) => {
    const copyOfBoard = [...defaultBoard];
    copyOfBoard[row][tile].items.push({ 
      row,
      tile,
      figure: figureName, 
      score: getPieceScore(figureName), 
      player: playerName, 
      id: playerId 
    });
    setBoard(copyOfBoard);
  };

  const insertAllTurnsIntoBoard = (turns) => {
    const copyOfBoard = [...defaultBoard];
    turns.forEach(turn => {
      copyOfBoard[turn.row][turn.tile].items.push(turn);
    });
    setBoard(copyOfBoard);
  }

  return { 
    board,
    setBoard, 
    defaultBoard, 
    insertFigureIntoBoard, 
    clearChessBoardTile, 
    clearChessBoard,
    insertAllTurnsIntoBoard,
  };
};
