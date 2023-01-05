import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './gameFooter.css';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

const GameFooterButtons = ({ skipCurrentPlayerMove }) => {
  const { finishMove, finished, isAllTurnsMade, lastTurn, isCurrentPlayerSpectator } = useContext(ChessBoardContext);

  return (
    <div className="btn-field margin-t-m gap-l">
      <button 
        type="button" 
        className="finish-btn padding-x-m padding-y-s rubik-font" 
        disabled={isAllTurnsMade || finished || !lastTurn || isCurrentPlayerSpectator} 
        onClick={finishMove}
      >
        Finish Move
      </button>
      <button 
        type="button"
        className="skip-btn padding-x-m padding-y-s rubik-font" 
        disabled={finished || isCurrentPlayerSpectator} 
        onClick={() => skipCurrentPlayerMove()}
      >
        Skip Move
      </button>
    </div>
  )
}

GameFooterButtons.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterButtons;