import React from 'react';
import PropTypes from 'prop-types';
import '../../static/style/chess-board.css';

const ChessBoard = ({ numberOfRows, numberOfCells }) => {
  const board = [...Array(numberOfRows).keys()].map((_row, rowIndex) =>
    [...Array(numberOfCells).keys()].map((_tile, tileIndex) => ({
      isFilled:
        (rowIndex % 2 && !(tileIndex % 2)) ||
        (!(rowIndex % 2) && tileIndex % 2),
    })),
  );

  return (
    <table id="chess-board">
      {board.map((row, rowIndex) => (
        <tr id={'row_' + rowIndex} key={rowIndex}>
          {row.map((tile, tileIndex) => (
            <td
              id={'cell_' + tileIndex}
              className={tile.isFilled ? 'black-tile' : 'white-tile'}
              key={tileIndex}
            />
          ))}
        </tr>
      ))}
    </table>
  );
};

ChessBoard.propTypes = {
  numberOfRows: PropTypes.number,
  numberOfCells: PropTypes.number,
};

export default ChessBoard;
