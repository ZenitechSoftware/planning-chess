import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ChessBoardPieces from './ChessBoardPieces';
import './chess-pieces.css';

function GameFooter({ skipMove }) {
  const { lastTurn, finishMove, canPlay, finished } = useContext(ChessBoardContext);

  return (
    <div id="game-footer">
      <div>
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <div className="btn-field">
        <button type="button" className="finish-btn" disabled={!lastTurn} onClick={finishMove}>
          Finish Move
        </button>
        <button type="button" className="skip-btn" disabled={finished || !canPlay} onClick={skipMove}>
          Skip Move
        </button>
      </div>
    </div>
  );
}

GameFooter.propTypes = {
  skipMove: PropTypes.func.isRequired,
};

export default GameFooter;
