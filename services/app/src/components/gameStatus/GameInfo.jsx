import React, { useContext } from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import CheckMark from '../../static/svg/Checkmark.svg';
import SkippedIcon from '../../static/svg/SkippedIcon.svg';
import BulletDot from '../../static/svg/BulletDot.svg';
import { ChessBoardContext } from "../../contexts/ChessBoardContext";
import { PlayerStatuses } from '../../constants/playerConstants';

const GameInfo = () => {
  const { voters } = useContext(ChessBoardContext);
  const playersDoneCount = voters.filter(p => p.status === PlayerStatuses.FigurePlaced).length;
  const playersSkippedCount = voters.filter(p => p.status === PlayerStatuses.MoveSkipped).length;
  
  return (
    <div className="game-info-row rubik-font align-c" data-testid="game-info-field">
      <div className="game-info-status player-count">
        <p data-testid="players-count">
          {voters.length === 1
            ? "1 player"
            : `${voters.length} players`}
        </p>
      </div>

      <div
        data-testid="players-done-count"
        className={classnames("game-info-status", {
          hide: playersDoneCount === 0,
        })}
      >
        <img src={BulletDot} className="game-info-icon" alt="bullet-dot" />
        <img src={CheckMark} className="game-info-icon" alt="players done icon" />
        <p className="players-done-color">{`${playersDoneCount}`}</p>
      </div>

      <div
        data-testid="players-skipped-count"
        className={classnames("game-info-status", {
          hide: playersSkippedCount === 0,
        })}
      >
        <img src={BulletDot} className="game-info-icon" alt="bullet-dot" />
        <img src={SkippedIcon} className="game-info-icon" alt="players skipped icon" />
        <p className="players-skipped-color">{`${playersSkippedCount}`}</p>
      </div>
    </div>
  );
}

export default GameInfo;
