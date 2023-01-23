import React from 'react';
import classnames from 'classnames';
import CheckMark from '../../static/svg/Checkmark.svg';
import SkippedIcon from '../../static/svg/SkippedIcon.svg';
import BulletDot from '../../static/svg/BulletDot.svg';
import { useChessBoardContext } from "../../contexts/ChessBoardContext";
import { PlayerStatuses } from '../../constants/playerConstants';

const GameInfo = () => {
  const { voters } = useChessBoardContext();
  const playersDoneCount = voters.filter(p => p.status === PlayerStatuses.FigurePlaced).length;
  const playersSkippedCount = voters.filter(p => p.status === PlayerStatuses.MoveSkipped).length;
  
  return (
    <div className="game-info-row padding-y-sm padding-x-xl rubik-font align-c font-size-xs" data-testid="game-info-field">
      <div className="game-info-status player-count margin-x-xs margin-y-0">
        <p data-testid="players-count margin-x-xs margin-y-0">
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
        <img src={BulletDot} className="game-info-icon margin-x-xs margin-y-0" alt="bullet-dot" />
        <img src={CheckMark} className="game-info-icon margin-x-xs margin-y-0" alt="players done icon" />
        <p className="players-done-color">{`${playersDoneCount}`}</p>
      </div>

      <div
        data-testid="players-skipped-count"
        className={classnames("game-info-status", {
          hide: playersSkippedCount === 0,
        })}
      >
        <img src={BulletDot} className="game-info-icon margin-x-xs margin-y-0" alt="bullet-dot" />
        <img src={SkippedIcon} className="game-info-icon margin-x-xs margin-y-0" alt="players skipped icon" />
        <p className="players-skipped-color">{`${playersSkippedCount}`}</p>
      </div>
    </div>
  );
}

export default GameInfo;
