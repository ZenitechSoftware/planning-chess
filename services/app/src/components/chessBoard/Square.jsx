import React, { useContext, useCallback, useState } from 'react';
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
  const [showPopover, setShowPopover] = useState(false);
  const filteredFigures = items.filter((item, index, self) => index === self.findIndex((val) => val.img === item.img));

  const renderBubble = useCallback((item, key) => {
    if (key < 2) {
      return (
        <div 
          key={`bubble-${key}`}
          className={classNames({
            "bubble": true,
            "multiple-bubbles": items.length !== 1,
            "nth-bubble": key !== 0
          })}
        >
          <span className="name">{item.player[0]}</span>
        </div>
      )
    } 
    if (key === 2) {
      return (
        <div key={`bubble-${key}`} className="bubble nth-bubble multiple-bubbles">
          <span className="name">{`+${items.length - 2}`}</span>
        </div>
      )
    }
    return null;
  }, [items]);

  const updatePopover = bool => {
    if (items.length && bool || !bool) {
      setShowPopover(bool);
    }
  }

  return (
    <div 
      className={classNames(["square", !items.length && row !== board.length - 1 && column !== 0 && 'is-empty-tile'])}
      onMouseEnter={() => updatePopover(true)}
      onMouseLeave={() => updatePopover(false)}
    >
      {!!items.length && <span className={classNames(["number", "number-row", filled && "number-filled"])}>{board[row][0].attribute}</span>}
      <div className="bubble-container">
        {items.map(renderBubble)}
      </div>
      <div className={classNames({"figure-container": items.length, "figure-container-centered": filteredFigures.length > 1})}>
        {filteredFigures.map((item, key) => key < 2 && (
          <div key={`figure-${key}`}>
            <img src={figures[item.figure].img} alt={item.figure} className={classNames(["figure-img", key > 0 && "figure-img-nth"])} />
          </div>
        ))}
        {filteredFigures.length === 1 && <span className="figure-text">{`${items[0].score} SP`}</span>}
        {filteredFigures.length > 2 && <span className="figure-text figure-text-margin">{`+${items.length - 2}`}</span>}
      </div>
      {!!items.length && 
      <span className={classNames(["number", "number-column", filled && "number-filled"])}>{board[board.length - 1][column].attribute}</span>}
      {!!items.length && (
        <div className={classNames(["pop-over", showPopover && "pop-over-opened"])}>
          <span className="header">{`Square ${board[row][0].attribute}${board[board.length - 1][column].attribute.toUpperCase()}:`}</span>
          {items.map((item, index) => (
            <div key={`move-info-${index}`} className="move-info">
              <div className={classNames(["bubble", "multiple-bubbles"])}>
                <span className="name">{item.player[0]}</span>
              </div>
              <span className="text">
                {`${item.player} - `}
                <span className="text-bold">{item.figure.charAt(0).toUpperCase() + item.figure.slice(1)}</span>
              </span>
              <div className="score">
                <span>{`${item.score} SP`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Square.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      figure: PropTypes.string,
      score: PropTypes.number,
      player: PropTypes.string
    })
  ).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  filled: PropTypes.bool.isRequired
};

export default Square;
