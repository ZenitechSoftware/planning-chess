import React, { useContext } from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import ClockIcon from './statusComponents/clock.svg';
import CompletedIcon from './statusComponents/completedIcon.svg';
import WaitingPlayersIcon from './statusComponents/waitingPlayersIcon.svg';
import {ChessBoardContext} from "../../contexts/ChessBoardContext";
import { useWebSockets } from "../../utils/useWebSockets";

function GameStatus() {
  const { isAllTurnsMade, globalScore } = useContext(ChessBoardContext);
  const { players } = useWebSockets();

  const iconSrc = () => {
    if(players.length === 1)
      return WaitingPlayersIcon;
    return isAllTurnsMade ? CompletedIcon : ClockIcon;
  }

  const gameStatusText = () => {
    if(players.length === 1) 
      return 'Waiting for more players';
    return isAllTurnsMade ? `Game complete - ${globalScore}SP` : "Game in progress...";
  }

  return (
    <div
      className={classnames("game-status-field", {
        "game-status-in-progress": !isAllTurnsMade,
        "game-status-completed": isAllTurnsMade,
      })}
    >
      <img src={iconSrc()} alt="game status icon" className="game-status-icon" />
      <p className="status-text">{gameStatusText()}</p>
    </div>
  );
}

export default GameStatus;
