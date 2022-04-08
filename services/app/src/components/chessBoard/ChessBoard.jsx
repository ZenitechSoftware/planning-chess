import React, { useContext } from 'react';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

import Tile from './Tile';
import './chess-board.css';

const ChessBoard = () => {
  const { placeItemOnBoard, board } = useContext(ChessBoardContext);

  return (
    <table id="chess-board">
      {board.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((tile, columnIndex) => (
            <Tile
              key={columnIndex}
              tile={tile}
              onClick={placeItemOnBoard}
              row={rowIndex}
              column={columnIndex}
              boardLength={board.length}
            />
          ))}
        </tr>
      ))}
    </table>
  );
};

export default ChessBoard;
