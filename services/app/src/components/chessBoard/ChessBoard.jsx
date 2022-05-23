import React, { useContext } from 'react';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

import Tile from './Tile';
import './chess-board.css';

const ChessBoard = () => {
  const { placeItemOnBoard, board } = useContext(ChessBoardContext);

  return (
    <div className="chess-board-container">
      <div className="rotated-outer">
        <span className="rotated-inner axis-title">Annotation of Work</span>
      </div>
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
        <tr>
          <td />
          <td colSpan={board.length - 1}>
            <span className="axis-title">Uncertainty</span>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ChessBoard;
