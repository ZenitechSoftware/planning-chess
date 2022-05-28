import React from 'react';
import './gameStatus.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CheckMark from './statusComponents/checkmark.svg';
import SkippedIcon from './statusComponents/skippedIcon.svg';
import BulletDot from './statusComponents/bulletDot.svg';

const GameInfo = ({ userCount }) => {
  const playersDone = 50;
  const playersSkipped = 10;

  return (
    <div className="game-info-row">
      <div className="game-info-status player-count">
        <p>
          {userCount === 1
            ? "1 player"
            : `${userCount} players`}
        </p>
      </div>

      <div
        className={classnames("game-info-status", {
          hide: playersDone === 0,
        })}
      >
        <img src={BulletDot} alt="bullet-dot" />
        <img src={CheckMark} alt="players done icon" />
        <p className="players-done-color">{`${playersDone}`}</p>
      </div>

      <div
        className={classnames("game-info-status", {
          hide: playersSkipped === 0,
        })}
      >
        <img src={BulletDot} alt="bullet-dot" />
        <img src={SkippedIcon} alt="players skipped icon" />
        <p className="players-skipped-color">{`${playersSkipped}`}</p>
      </div>
    </div>
  );
}

GameInfo.propTypes = {
  userCount: PropTypes.number.isRequired,
};

export default GameInfo;
