import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ChessBoardPieces from './ChessBoardPieces';
import './chess-pieces.css';
import ExplanatoryTooltip  from '../chessBoard/ExplanatoryTooltip';


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
        <ExplanatoryTooltip title="Skips your move. The game continues" placement="rightTop">
            <button type="button" className="skip-btn" disabled={finished} onClick={() => skipCurrentPlayerMove()}>
              Skip Move
            </button>
         </ExplanatoryTooltip>
      </div>
    </div>
  );
}

GameFooter.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooter;
