import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './gameFooter.css';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import ExplanatoryTooltip  from '../chessBoard/ExplanatoryTooltip';
import { GameState } from '../../constants/gameConstants';

const GameFooterButtons = ({ skipCurrentPlayerMove }) => {
  const { finishMove, finished, lastTurn, isCurrentPlayerSpectator, gameState } = useContext(ChessBoardContext);
  return (
    <div className="btn-field margin-t-m gap-l">
      <button 
        type="button" 
        className="finish-btn padding-x-m padding-y-s rubik-font" 
        disabled={gameState === GameState.GAME_FINISHED  || finished || !lastTurn || isCurrentPlayerSpectator} 
        onClick={finishMove}
      >
        Finish Move
      </button>

      <ExplanatoryTooltip title="Skips your move. The game continues" placement="rightTop">
        <button 
          type="button"
          className="skip-btn padding-x-m padding-y-s rubik-font" 
          disabled={finished || isCurrentPlayerSpectator} 
          onClick={() => skipCurrentPlayerMove()}
        >
          Skip Move
        </button>
      </ExplanatoryTooltip>
    </div>
  )
}
GameFooterButtons.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};
export default GameFooterButtons;