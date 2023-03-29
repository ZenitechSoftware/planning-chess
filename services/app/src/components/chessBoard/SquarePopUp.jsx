import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { squareItemPropType } from '../../prop-types/chessboard';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';
import UserAvatar from '../avatar/UserAvatar';

const SquarePopUp = ({ items, showPopover, row, column }) => {
  const { board } = useChessBoardContext();

  const getPieceIconSrc = (pieceName) => {
    const src = PIECES.find(piece => piece.name === pieceName);
    return src.img;
  }

  return (
    <div className={classNames(["pop-over", showPopover && "pop-over-opened"])}>
      <span className="pop-over-title" data-testid="pop-up-selected-square">{`Square ${board[row][0].attribute}${board[board.length - 1][column].attribute.toUpperCase()}:`}</span>
      {items.map((item, index) => (
        <div key={`move-info-${index}`} className="move-info f-1 align-c margin-t-s">
          <div className='pop-up-figure-icon-container f-center'>
            <img className='pop-up-figure-icon margin-r-xs' data-testid="pop-up-figure-icon" src={getPieceIconSrc(item.figure)} alt="move-piece-icon" />
          </div>
          <UserAvatar 
            playerId={item.playerId}
            size='xs'
            bordered
            playerInitials={item.player[0]}
          />
          <span className="text">
            {`${item.player} - `}
          </span>
          <div className="score">
            <span data-testid="pop-up-score">{`${item.score} SP`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

SquarePopUp.propTypes = {
  items: PropTypes.arrayOf(squareItemPropType).isRequired,
  showPopover: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};

export default SquarePopUp