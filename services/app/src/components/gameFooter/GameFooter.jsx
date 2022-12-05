import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ChessBoardPieces from './ChessBoardPieces';
import './chess-pieces.css';

function GameFooter({ skipCurrentPlayerMove }) {
  const { lastTurn, finishMove, finished, isAllTurnsMade } = useContext(ChessBoardContext);
  return (
    <div id="game-footer">
      <div>
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <div className="btn-field">
        <button type="button" data-testid="finish-move-btn" className="finish-btn" disabled={!lastTurn || isAllTurnsMade || (finished && !isAllTurnsMade)} onClick={finishMove}>
          Finish Move
        </button>
        <button type="button" data-testid="skip-move-btn" className="skip-btn" disabled={finished} onClick={() => skipCurrentPlayerMove()}>
          Skip Move
        </button>
      </div>
    </div>
  );
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooter;
