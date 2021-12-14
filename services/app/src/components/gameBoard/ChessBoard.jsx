import React from 'react';
import '../../static/style/chess-board.css';

// eslint-disable-next-line react/prop-types
const ChessBoard = ({ numberOfRows, numberOfCells }) => {
  const rowNumber = numberOfRows;
  const rowCellNumber = numberOfCells;

  const squares = [];
  const color = ['white_tile', 'black_tile'];

  let useColorIndx = 0;
  let colorSwitch = false;
  let cellNo = 0;

  for (let row = 1; row <= rowNumber; row++) {
    let cell = [];
    for (let rowCell = 1; rowCell <= rowCellNumber; rowCell++) {
      cellNo++;
      if (colorSwitch) {
        if (rowCell % 2 === 0) {
          useColorIndx = 0;
        } else {
          useColorIndx = 1;
        }
      } else {
        if (rowCell % 2 === 0) {
          useColorIndx = 1;
        } else {
          useColorIndx = 0;
        }
      }

      cell.push(
        <td
          id={'cell_' + cellNo.toString()}
          title={color[useColorIndx]}
          key={cellNo}
        >
          {cellNo}
        </td>,
      );
    }
    squares.push(
      <tr id={'row_' + row.toString()} key={'rowNo_' + row}>
        {cell}
      </tr>,
    );
    if (!colorSwitch) {
      colorSwitch = true;
    } else {
      colorSwitch = false;
    }
  }

  return <table id="chess_board">{squares}</table>;
};

export default ChessBoard;
