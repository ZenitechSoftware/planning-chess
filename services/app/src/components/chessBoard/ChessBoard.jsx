import React from 'react';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

import Tile from './Tile';
import './chess-board.css';

const ChessBoard = () => {
  const { placeItemOnBoard, board } = useChessBoardContext();
  
  return (
    <div className="chess-board-container border-r-4 f-row-between align-c">
      <div className="rotated-outer">
        <span className="rotated-inner axis-title font-size-xs">Amount of work</span>
      </div>
      <table id="chess-board">
        <tbody>
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
              <span className="axis-title font-size-xs">Uncertainty</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChessBoard;
