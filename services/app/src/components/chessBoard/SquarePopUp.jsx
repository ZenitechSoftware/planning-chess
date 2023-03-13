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
    <div 
      className={classNames("pop-over padding-y-sm padding-x-m", {
        "pop-over-opened": showPopover
      })}
    >
      <span className="pop-over-title weight-700 font-size-l lato-font">
        {`Square ${board[row][0].attribute}${board[board.length - 1][column].attribute.toUpperCase()}:`}
      </span>
      {items.map((item, index) => (
        <div key={`move-info-${index}`} className="move-info f-1 align-c margin-t-s">
          <div className='pop-up-figure-icon-container f-center'>
            <img className='pop-up-figure-icon margin-r-xs' src={getPieceIconSrc(item.figure)} alt="move-piece-icon" />
          </div>
          <UserAvatar 
            playerId={item.playerId}
            size='xs'
            bordered
            playerInitials={item.player[0]}
          />
          <span className="text rubik-font font-size-l margin-l-s">
            {`${item.player} - `}
          </span>
          <div className="score margin-l-s padding-y-0 padding-x-s">
            <span className='rubik-font'>{`${item.score} SP`}</span>
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