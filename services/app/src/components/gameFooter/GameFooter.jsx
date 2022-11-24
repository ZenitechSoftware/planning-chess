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
        <button type="button" className="finish-btn" disabled={!lastTurn || isAllTurnsMade || (finished && !isAllTurnsMade)} onClick={finishMove}>
          Finish Move
        </button>
        <div className='hoverText'>
          <button type="button" className="skip-btn" disabled={finished} onClick={() => skipCurrentPlayerMove()}>
            Skip Move
          </button>
          <div className="explText">Skips your move. The game continues</div>
        </div>
      </div>
    </div>
  );
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooter;
