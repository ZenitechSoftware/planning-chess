import React from 'react';
import PropTypes from 'prop-types';
import './chessBoardPieces.css';
import classnames from 'classnames';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { PIECES } from '../../constants/board';
import { PlayerStatuses } from '../../constants/playerConstants';
import SkipMoveBtn from './SkipMoveBtn';

const ChessBoardPieces = ({ skipCurrentPlayerMove }) => {
  const { setSelectedItem, selectedItem, isCurrentPlayerSpectator, currentPlayer } = useChessBoardContext();

  const handleClick = (figureName) => {
    if (isCurrentPlayerSpectator) {
      return;
    }

    if (currentPlayer.status === PlayerStatuses.ActionNotTaken) {
      setSelectedItem(figureName);

      if (figureName === 'skip') {
        skipCurrentPlayerMove();
      }
    }
  };

  return (
    <div id="chess-pieces-container" className='align-c'>
      {PIECES.map((figure) => (
        <div
          key={figure.name}
          role="button"
          data-testid={`${figure.name}-piece-btn`}
          tabIndex={0}
          aria-hidden="true"
          onClick={() => handleClick(figure.name)}
          className={classnames('piece-field padding-y-s padding-x-m f-center rubik-font', {
            'piece-field-selected border-r-4': selectedItem === figure.name,
          })}
        >
          <img 
            src={figure.img} 
            alt={figure.name} 
            className={classnames('figure-img', {
              'skip-icon-style': figure.name === 'skip'
            })}
          />
          <p key={figure.name} className="figure-title font-size-m">
            {figure.name}
          </p>
          <div className="figure-strength-container border-r-20 padding-y-0 padding-x-xxs f-center">
            <p className="figure-strength font-size-xxs weight-700">{figure.strength}</p>
          </div>
        </div>
      ))}

      <SkipMoveBtn handleClick={handleClick} />
    </div>
  );
};

ChessBoardPieces.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default ChessBoardPieces;
