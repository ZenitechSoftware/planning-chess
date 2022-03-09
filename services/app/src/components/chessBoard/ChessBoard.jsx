import React from 'react';
import { useChessBoardContext } from '../../hooks/useChessBoardContext';

import Tile from './Tile';
import '../../static/style/chess-board.css';

const ChessBoard = () => {
  const { placeItemOnBoard, board } = useChessBoardContext();

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
