import React from 'react';
import '../../static/style/chess-board.css';

const ChessBoard = () => {
    
  const rowNumber = 6;
  const colNumber = 6;

  const squares = [];
  const color = ['white_tile', 'black_tile'];
  let colNo = 0;

  for (let row = 1; row <= rowNumber; row++) {
    let cell = [];
    for (let col = 1; col <= colNumber; col++) {
      colNo++;
      cell.push(<td id={'col_' + colNo.toString()} title={color[1]}>col {colNo}</td>);
    }
    squares.push(<tr id={'row_' + row.toString()}>{cell}</tr>);
  }

  return (
    <div className="chess-board">
      <table>
        {
          squares
        }
      </table>
    </div>
  );
};

export default ChessBoard;
