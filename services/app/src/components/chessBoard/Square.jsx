import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PIECES } from '../../constants/board';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

const figures = PIECES.reduce((prev, curr) => ({ ...prev, [curr.name]: curr}), {});

const Square = ({
  items,
  row,
  column,
  filled
}) => {
  const { board } = useContext(ChessBoardContext);
  return (
    <div className="square">
      {!!items.length && <span className={classNames(["number", "number-row", !!filled && "number-filled"])}>{board[row][0].attribute}</span>}
      <div className="bubble-container">
        {items.map((item, key) => (
          <div 
            key={`name${key}`}
            className={classNames({
              "bubble": true
            })}
          >
            <span className="name">{item.user[0]}</span>
          </div>
        ))}
      </div>
      <div className="figure-container">
        {items.map((item, key) => (
          <div
            key={`figure${key}`}
          >
            <img src={figures[item.figure].img} alt={item.figure} className="figure-img" />
          </div>
        ))}
        {items.length === 1 && <span className="figure-text">{`${items[0].score} SP`}</span>}
      </div>
      {!!items.length && <span className={classNames(["number", "number-column", !!filled && "number-filled"])}>{board[board.length - 1][column].attribute}</span>}
    </div>
  );
};

Square.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      figure: PropTypes.string,
      score: PropTypes.number,
      user: PropTypes.string
    })
  ).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  filled: PropTypes.number.isRequired
};

export default Square;
