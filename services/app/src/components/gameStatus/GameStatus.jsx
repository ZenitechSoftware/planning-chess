import React from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import ClockIcon from './statusComponents/clock.svg';
import CompletedIcon from './statusComponents/completedIcon.svg';

function GameStatus() {
  const gameFinished = true;
  const SpScore = 1;

  const gameStatusText = gameFinished ? `Game complete - ${SpScore}SP` : "Game in progress...";
  const iconScr = gameFinished ? CompletedIcon : ClockIcon;

  return (
    <div
      className={classnames("game-status-field", {
        "game-status-in-progress": !gameFinished,
        "game-status-completed": gameFinished,
      })}
    >
      <img src={iconScr} alt="game status icon" className="game-status-icon" />
      <p className="status-text">{gameStatusText}</p>
    </div>
  );
}

export default GameStatus;
