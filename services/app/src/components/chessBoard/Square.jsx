import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Avatar } from 'antd';
import { PIECES } from '../../constants/board';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import UserAvatar from '../avatar/UserAvatar';

const figures = PIECES.reduce((prev, curr) => ({ ...prev, [curr.name]: curr}), {});

const Square = ({
  items,
  row,
  column,
  filled
}) => {
  const { board } = useChessBoardContext();
  const [showPopover, setShowPopover] = useState(false);
  const filteredFigures = items.filter((item, index, self) => index === self.findIndex((val) => val.img === item.img));

  const avatarSize = items.length > 1
    ? 'xs'
    : 's';

  const maxAvatarCount = items.length <= 3
    ? 3
    : 2;

  const updatePopover = bool => {
    if (items.length && bool || !bool) {
      setShowPopover(bool);
    }
  }

  return (
    <div
      data-testid={`chess-tile-${row}-${column}`}
      className={classNames(["square", !items.length && row !== board.length - 1 && column !== 0 && 'is-empty-tile'])}
      onMouseEnter={() => updatePopover(true)}
      onMouseLeave={() => updatePopover(false)}
    >
      {!!items.length && <span className={classNames(["number", "number-row", filled && "number-filled"])}>{board[row][0].attribute}</span>}
      <div className="bubble-container">
        <Avatar.Group
          maxCount={maxAvatarCount}
          maxStyle={{
            color: 'var(--primary)',
            border: '1px solid var(--primary)',
            backgroundColor: 'var(--background)',
            fontFamily: 'Poppins',
          }}
          overlayClassName='hide-group-popover'
          size={24}
        >
          {items.map((item, index) => (
            <UserAvatar 
              size={avatarSize} 
              id={item.playerId} 
              key={`bubble-${index}`}
              avatarText={item.player[0]}
              isBorderNeeded
            />
          ))}
        </Avatar.Group>
      </div>
      <div className={classNames({"figure-container": items.length, "figure-container-centered": filteredFigures.length > 1})}>
        {filteredFigures.map((item, key) => key < 2 && (
          <div key={`figure-${key}`}>
            <img src={figures[item.figure].img} alt={item.figure} className={classNames(["figure-img", key > 0 && "figure-img-nth"])} />
          </div>
        ))}
        {filteredFigures.length === 1 && <span className="figure-text">{`${figures[items[0].figure].strength}`}</span>}
        {filteredFigures.length > 2 && <span className="figure-text figure-text-margin">{`+${items.length - 2}`}</span>}
      </div>
      {!!items.length &&
      <span className={classNames(["number", "number-column", filled && "number-filled"])}>{board[board.length - 1][column].attribute}</span>}
      {!!items.length && (
        <div className={classNames(["pop-over", showPopover && "pop-over-opened"])}>
          <span className="pop-over-title">{`Square ${board[row][0].attribute}${board[board.length - 1][column].attribute.toUpperCase()}:`}</span>
          {items.map((item, index) => (
            <div key={`move-info-${index}`} className="move-info">
              <UserAvatar id={item.playerId} size='xs' avatarText={item.player[0].toUpperCase()} />
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
