import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Avatar } from 'antd';
import { PIECES } from '../../constants/board';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import UserAvatar from '../avatar/UserAvatar';
import { squareItemPropType } from '../../prop-types/chessboard';
import SquarePopUp from './SquarePopUp';
import { GameState } from '../../constants/gameConstants'

const figures = PIECES.reduce((prev, curr) => ({ ...prev, [curr.name]: curr}), {});

const Square = ({
  items,
  row,
  column,
  filled
}) => {
  const { board, currentPlayerId, gameState } = useChessBoardContext();
  const [isHovered, setIsHovered] = useState(false);

  const turnToShow = useMemo(() => {
    const myMove = items.find(figure => figure.playerId === currentPlayerId);
    return myMove ?? items[0];
  }, [items]);

  const avatarSize = items.length > 1
    ? 'xs'
    : 's';

  const maxAvatarCount = items.length <= 3
    ? 3
    : 2;

  return (
    <div
      data-testid={`chess-tile-${row}-${column}`}
      className={classNames("square", {
        'is-empty-tile': !items.length && row !== board.length - 1 && column !== 0
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered && (!items.length && row !== board.length - 1 && column !== 0) && (gameState !== GameState.GAME_FINISHED)) && (
        <span
          className={classNames('number number-row', {
            'number-filled': filled
          })}
        >
          {board[row][0].attribute}
        </span>
      )}

      <div className='square-move-info '>
        <div className='square-avatar-container f-center'>
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
                playerId={item.playerId}
                key={`bubble-${index}`}
                playerInitials={item.player[0]}
                dataTestId={`square-${item.playerId}`}
                bordered
              />
            ))}
          </Avatar.Group>
        </div>

        {turnToShow && (
          <div className='square-move-text f-row justify-c font-size-xs'>
            <img 
              src={figures[turnToShow.figure].img} 
              alt={`${turnToShow.figure} icon`} 
              className='figure-img'
            />

            <span className="figure-text rubik-font weight-800">
              {`${figures[turnToShow.figure].strength}`}
            </span>
          </div>
        )}
      </div>

      {(isHovered && (!items.length && row !== board.length - 1 && column !== 0) && (gameState !== GameState.GAME_FINISHED))&& (
        <span 
          className={classNames('number number-column', {
            'number-filled': filled,
          })}
        >
          {board[board.length - 1][column].attribute}
        </span>
      )}
      {!!items.length && <SquarePopUp items={items} showPopover={isHovered} row={row} column={column} />}
    </div>
  );
};

Square.propTypes = {
  items: PropTypes.arrayOf(squareItemPropType).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  filled: PropTypes.bool.isRequired
};

export default Square;
