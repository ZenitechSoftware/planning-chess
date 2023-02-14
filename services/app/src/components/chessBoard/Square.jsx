import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Avatar } from 'antd';
import { PIECES } from '../../constants/board';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import UserAvatar from '../avatarPicture/UserAvatar';

const figures = PIECES.reduce((prev, curr) => ({ ...prev, [curr.name]: curr}), {});

const Square = ({
  items,
  row,
  column,
  filled
}) => {
  const { board, players } = useChessBoardContext();
  const [showPopover, setShowPopover] = useState(false);
  const filteredFigures = items.filter((item, index, self) => index === self.findIndex((val) => val.img === item.img));

  const renderBubble = useCallback((playerBubbles) => {
    if (playerBubbles.length === 0) {
      return null;
    }

    if (playerBubbles.length > 3) {
      const avatarToRender = playerBubbles.slice(0, 2);
      return (
        <Avatar.Group maxCount={3}>
          {avatarToRender.map((player, index) => (
            <UserAvatar 
              size='x-small' 
              id={player.playerId} 
              key={`bubble-${index}`} 
              avatarText={player.player[0]}
            />
          ))}
          <Avatar size={24} style={{ backgroundColor: '#F3F6FA', border: '1px solid var(--primary)', color: 'var(--primary)', verticalAlign: 'middle' }}>
            +{playerBubbles.length - 2}
          </Avatar>
        </Avatar.Group>
      );
    }

    if (playerBubbles.length > 1 && playerBubbles.length <= 3) {
      return (
        <Avatar.Group maxCount={3}>
          {playerBubbles.map((player, index) => (
            <UserAvatar 
              size='x-small' 
              id={player.playerId} 
              key={`bubble-${index}`}
              avatarText={player.player[0]}
            />
          ))}
        </Avatar.Group>
      )
    }

    return (
      <UserAvatar 
        size='small' 
        id={playerBubbles[0].playerId} 
        avatarText={playerBubbles[0].player[0].toUpperCase()} 
      />
    );
  }, [items, players]);

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
        {renderBubble(items)}
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
              <UserAvatar id={item.playerId} size='x-small' avatarText={item.player[0].toUpperCase()} />
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
