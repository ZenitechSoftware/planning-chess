import React, { useContext } from 'react';
import './gameStatus.css';
import ClockIcon from './statusComponents/clock.svg';
import CompletedIcon from './statusComponents/completedIcon.svg';
import WaitingPlayersIcon from './statusComponents/waitingPlayersIcon.svg';
import {ChessBoardContext} from "../../contexts/ChessBoardContext";

function GameStatus() {
  const { isAllTurnsMade, globalScore, isGameInProgress } = useContext(ChessBoardContext);
  
  if(isGameInProgress) {
    return (
      <div className='game-status-field game-status-in-progress'>
        <img src={ClockIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text">Game in progress...</p>
      </div>
    )
  }
  
  if(isAllTurnsMade) {
    return (
      <div className='game-status-field game-status-completed'>
        <img src={CompletedIcon} alt="game status icon" className="game-status-icon" />
        <p className="status-text">Game complete - {globalScore} SP</p>
      </div>
    )
  }
  
  return (
    <div className='game-status-field game-status-in-progress'>
      <img src={WaitingPlayersIcon} alt="game status icon" className="game-status-icon" />
      <p className="status-text">Waiting for more players</p>
    </div>
  )
}

export default GameStatus;
