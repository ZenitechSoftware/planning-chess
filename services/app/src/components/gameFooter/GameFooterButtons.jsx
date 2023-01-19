import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './gameFooter.css';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

const GameFooterButtons = ({ skipCurrentPlayerMove }) => {
  const { finishMove, finished, isAllTurnsMade, lastTurn, clearBoard, resetUserMove} = useContext(ChessBoardContext);

  return (
    <div className="btn-field margin-t-m gap-l">
      <button 
        type="button" 
        className="finish-btn padding-x-m padding-y-s rubik-font" 
        disabled={isAllTurnsMade || finished || !lastTurn} 
        onClick={finishMove}
        hidden={finished}
      >
        Finish Move
      </button>
      <button 
        type="button" 
        className="unselect-btn padding-x-m padding-y-s rubik-font" 
        onClick={resetUserMove}
        hidden={!finished || isAllTurnsMade}
      >
        Unselect Move
      </button>
      <button 
        type="button"
        className="skip-btn padding-x-m padding-y-s rubik-font" 
        disabled={finished} 
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