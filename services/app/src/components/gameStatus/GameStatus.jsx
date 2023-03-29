import React from 'react';
import ClockIcon from '../../static/svg/Clock.svg';
import CompletedIcon from '../../static/svg/CompletedIcon.svg';
import WaitingPlayersIcon from '../../static/svg/WaitingPlayersIcon.svg';
import { useChessBoardContext } from "../../contexts/ChessBoardContext";
import { GameState } from '../../constants/gameConstants';

const GameStatus = () => {
  const { globalScore, gameState } = useChessBoardContext();
  
  if(gameState === GameState.GAME_IN_PROGRESS) {
    return (
      <div className='game-status-field padding-y-m padding-x-xl game-status-in-progress align-c'>
        <img src={ClockIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text font-size-m margin-y-0 margin-x-s" data-testid="game-in-progress">Game in progress...</p>
      </div>
    )
  }
  
  if(gameState === GameState.GAME_FINISHED) {
    return (
      <div className='game-status-field padding-y-m padding-x-xl game-status-completed align-c'>
        <img src={CompletedIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text font-size-m margin-y-0 margin-x-s" data-testid="game-complete">Game complete - {globalScore} SP</p>
      </div>
    )
  }
  
  return (
    <div className='game-status-field padding-y-m padding-x-xl game-status-in-progress align-c'>
      <img src={WaitingPlayersIcon} alt="game status icon" className="game-status-icon" />
      <p className="status-text font-size-m margin-y-0 margin-x-s" data-testid="waiting-for-more-players">Waiting for more players</p>
    </div>
  )
}

export default GameStatus;
