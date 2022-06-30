import React, {useEffect, useContext, useState} from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import ClockIcon from './statusComponents/clock.svg';
import CompletedIcon from './statusComponents/completedIcon.svg';
import {useWebSockets} from "../../utils/useWebSockets";
import {ChessBoardContext} from "../../contexts/ChessBoardContext";
import {buildPlayerConnectedEventMessage} from "../../api/playerApi";

function GameStatus() {
  const [gameFinished, setGameFinished] = useState(false);
  const SpScore = 0;
  const {isAllTurnsMade} = useContext(ChessBoardContext);
  console.log(isAllTurnsMade);

  console.log()
  useEffect(() => {
    if (isAllTurnsMade) {
      setGameFinished(true);
    }
  }, [isAllTurnsMade]);

  const gameStatusText = gameFinished ? `Game complete - ${SpScore}SP` : "Game in progress...";
  const iconScr = gameFinished ? CompletedIcon : ClockIcon;

  return (
    <div3
      className={classnames("game-status-field", {
        "game-status-in-progress": !gameFinished,
        "game-status-completed": gameFinished,
      })}
    >
      <img src={iconScr} alt="game status icon" className="game-status-icon" />
      <p className="status-text">{gameStatusText}</p>
    </div3>
  );
}

export default GameStatus;
