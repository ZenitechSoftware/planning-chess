import React, { useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ChessBoardPieces from './ChessBoardPieces';
import './chess-pieces.css';
import { useWebSockets } from '../../utils/useWebSockets';

function GameFooterActive({ skipCurrentPlayerMove }) {
  const { lastTurn, finishMove, finished, isAllTurnsMade } = useContext(ChessBoardContext);
  const { players } = useWebSockets();

  return (
    <>
      <div className={classnames({
        'figure-explain-field-disabled': players.length === 1,
        })}
      >
        <p>Complexity | Select and place the figure on the board</p>
      </div>
      <div className="figure-field">
        <ChessBoardPieces />
      </div>
      <div className="btn-field">
        <button type="button" className="finish-btn" disabled={!lastTurn || isAllTurnsMade || (finished && !isAllTurnsMade)} onClick={finishMove}>
          Finish Move
        </button>
        <button type="button" className="skip-btn" disabled={finished || players.length === 1} onClick={() => skipCurrentPlayerMove()}>
          Skip Move
        </button>
      </div>
    </>
  );
}

GameFooterActive.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};

export default GameFooterActive;
