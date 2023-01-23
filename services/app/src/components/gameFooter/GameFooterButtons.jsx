import React from 'react';
import './game-footer.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { GameState } from '../../constants/gameConstants';

const GameFooterButtons = () => {
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
    </div>
  )
}
export default GameFooterButtons;