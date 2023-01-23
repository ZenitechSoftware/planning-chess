import React from 'react';
import PropTypes from 'prop-types';
import './gameFooter.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { GameState } from '../../constants/gameConstants';
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';

const GameFooterButtons = ({ skipCurrentPlayerMove }) => {
  const { finishMove, finished, lastTurn, isCurrentPlayerSpectator, gameState } = useChessBoardContext();
  return (
    <div className="btn-field margin-t-m gap-l">
      <button 
        type="button" 
        className="finish-btn border-r-4 font-size-s padding-x-m padding-y-s rubik-font" 
        disabled={gameState === GameState.GAME_FINISHED  || finished || !lastTurn || isCurrentPlayerSpectator} 
        onClick={finishMove}
      >
        Finish Move
      </button>

      
      <button 
        type="button"
        className="skip-btn font-size-s padding-x-m padding-y-s rubik-font"
        disabled={finished || isCurrentPlayerSpectator} 
        onClick={() => skipCurrentPlayerMove()}
      >
        <PlanningChessTooltip title="Skips your move. The game continues" placement="right">
          <span>Skip Move</span>
        </PlanningChessTooltip>
      </button>
    </div>
  )
}
GameFooterButtons.propTypes = {
  skipCurrentPlayerMove: PropTypes.func.isRequired,
};
export default GameFooterButtons;