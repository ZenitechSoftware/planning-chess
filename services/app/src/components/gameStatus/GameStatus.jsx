import React, { useContext } from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import ClockIcon from './statusComponents/clock.svg';
import CompletedIcon from './statusComponents/completedIcon.svg';
import {ChessBoardContext} from "../../contexts/ChessBoardContext";

function GameStatus() {
  const { isAllTurnsMade, globalScore } = useContext(ChessBoardContext);

  const gameStatusText = isAllTurnsMade ? `Game complete - ${globalScore}SP` : "Game in progress...";
  const iconScr = isAllTurnsMade ? CompletedIcon : ClockIcon;

  return (
    <div
      data-testid="game-status-id"
      className={classnames("game-status-field", {
        "game-status-in-progress": !isAllTurnsMade,
        "game-status-completed": isAllTurnsMade,
      })}
    >
      <img src={iconScr} alt="game status icon" className="game-status-icon" />
      <p className="status-text">{gameStatusText}</p>
    </div>
  );
}

export default GameStatus;
