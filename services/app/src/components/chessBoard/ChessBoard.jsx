import React from 'react';
import PropTypes from 'prop-types';
import '../../static/style/chess-board.css';

const ChessBoard = ({ numberOfRows, numberOfColumns }) => {
  const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];
  const board = [...Array(numberOfRows + 1).keys()].map((_row, rowIndex) =>
    [...Array(numberOfColumns + 1).keys()].map((_tile, tileIndex) => ({
      attribute:
        tileIndex === 0 && rowIndex !== numberOfRows
          ? numberOfColumns - rowIndex
          : tileIndex !== 0 && rowIndex === numberOfRows
          ? alphabetArray[tileIndex - 1]
          : null,
      isFilled:
        tileIndex !== 0 && rowIndex !== numberOfRows
          ? (rowIndex % 2 && !(tileIndex % 2)) ||
            (!(rowIndex % 2) && tileIndex % 2)
          : null,
    })),
  );

  return (
    <table id="chess-board">
      {board.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((tile, tileIndex) => (
            <td
              className={
                tile.isFilled
                  ? 'black-tile'
                  : !tile.attribute &&
                    rowIndex !== board.length - 1 &&
                    tileIndex !== 0
                  ? 'white-tile'
                  : ''
              }
              key={tileIndex}
            >
              {tile.attribute}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

ChessBoard.propTypes = {
  numberOfRows: PropTypes.number.isRequired,
  numberOfColumns: PropTypes.number.isRequired,
};

export default ChessBoard;
