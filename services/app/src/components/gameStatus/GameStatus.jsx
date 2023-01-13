import React from 'react';
import './gameStatus.css';
import ClockIcon from '../../static/svg/Clock.svg';
import CompletedIcon from '../../static/svg/CompletedIcon.svg';
import WaitingPlayersIcon from '../../static/svg/WaitingPlayersIcon.svg';
import { useChessBoardContext } from "../../contexts/ChessBoardContext";
import { GameState } from '../../constants/gameConstants';

const GameStatus = () => {
  const { globalScore, gameState } = useChessBoardContext();
  
  if(gameState === GameState.GAME_IN_PROGRESS) {
    return (
      <div className='game-status-field game-status-in-progress align-c'>
        <img src={ClockIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text">Game in progress...</p>
      </div>
    )
  }
  
  if(gameState === GameState.GAME_FINISHED) {
    return (
      <div className='game-status-field game-status-completed align-c'>
        <img src={CompletedIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text">Game complete - {globalScore} SP</p>
      </div>
    )
  }
  
  return (
    <div className='game-status-field game-status-in-progress align-c'>
      <img src={WaitingPlayersIcon} alt="game status icon" className="game-status-icon" />
      <p className="status-text">Waiting for more players</p>
    </div>
  )
}

export default GameStatus;
