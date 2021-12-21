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

  const alphabetArray = [...'abcdefghijklmnopqrstuvwxyz'];
  const numberArray = Array.from(
    { length: board.length },
    (_, i) => i + 1,
  ).reverse();

  board.push(
    [...Array(numberOfCells).keys()].map((_tile, tileIndex) => ({
      xAxis: alphabetArray[tileIndex],
    })),
  );

  board.forEach((element, i) => {
    if (i !== board.length) {
      element.unshift({ yAxis: numberArray[i] });
    } else {
      element.unshift({ yAxis: '' });
    }
  });

  return (
    <table id="chess-board">
      {board.map((row, rowIndex) => (
        <tr id={'row_' + rowIndex} key={rowIndex}>
          {row.map((tile, tileIndex) => (
            <td
              id={'cell_' + tileIndex}
              className={
                'isFilled' in tile
                  ? tile.isFilled
                    ? 'black-tile'
                    : 'white-tile'
                  : 'xAxis' in tile
                  ? tile.xAxis
                  : 'yAxis' in tile
                  ? tile.yAxis
                  : ''
              }
              key={tileIndex}
            >
              {'yAxis' in tile ? tile.yAxis : tile.xAxis}
            </td>
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
