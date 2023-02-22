import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { squareItemsPropType } from '../../prop-types/chessboard';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { rgbToColor } from '../../helpers/rgbToColor';

const SquarePopUp = ({ items, showPopover, row, column }) => {
  const { board, findUserById } = useChessBoardContext();

  const playerAvatarColor = (id) => {
    const player = findUserById(id);
    if(!player) return {};
    return {
      color: rgbToColor(player.color.text),
      backgroundColor: rgbToColor(player.color.background),
    }
  }

  return (
    <div className={classNames(["pop-over", showPopover && "pop-over-opened"])}>
      <span className="pop-over-title">{`Square ${board[row][0].attribute}${board[board.length - 1][column].attribute.toUpperCase()}:`}</span>
      {items.map((item, index) => (
        <div key={`move-info-${index}`} className="move-info">
          <div 
            className={classNames(["bubble align-c", "multiple-bubbles align-c"])}
            style={
              playerAvatarColor(item.playerId)
            }  
          >
            <span className="name">{item.player[0]}</span>
          </div>
          <span className="text">
            {`${item.player} - `}
          </span>
          <div className="score">
            <span>{`${item.score} SP`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

SquarePopUp.propTypes = {
  items: squareItemsPropType.isRequired,
  showPopover: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};

export default SquarePopUp