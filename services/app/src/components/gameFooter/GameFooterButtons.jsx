import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './gameFooter.css';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

const GameFooterButtons = ({ skipCurrentPlayerMove }) => {
  const { finishMove, finished, isAllTurnsMade } = useContext(ChessBoardContext);

  return (
    <div className="btn-field">
      <button type="button" className="finish-btn" disabled={isAllTurnsMade || finished} onClick={finishMove}>
        Finish Move
      </button>
      <button type="button" className="skip-btn" disabled={finished} onClick={() => skipCurrentPlayerMove()}>
        Skip Move
      </button>
    </div>
  )
}

GameFooterButtons.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterButtons;