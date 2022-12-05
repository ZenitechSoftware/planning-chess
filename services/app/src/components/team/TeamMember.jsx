import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import Skip from './teamComponents/Skip.svg';
import Remove from './teamComponents/Remove.svg';
import './team.css';
import CheckMark from "../gameStatus/statusComponents/checkmark.svg";
import SkippedIcon from "../gameStatus/statusComponents/skippedIcon.svg";

function TeamMember({ name, id, skipMove, color, status, removePlayer, index }) {
  return (
    <div className="team-list-item" data-testid={`list-${name}-${index}`}>
      <div
        className="team-list-item-avatar"
        style={{
        backgroundColor: `rgb(${color.background.r}, ${color.background.g}, ${color.background.b})`
      }}
      >
        <div
          style={{
              color: `rgb(${color.text.r}, ${color.text.g}, ${color.text.b})`
            }}
        >
          {name[0].toUpperCase()}
        </div>
      </div>
      {name}
      { status === playerStatuses.FigurePlaced && <img src={CheckMark} alt="player done icon" /> }
      { status === playerStatuses.MoveSkipped && <img src={SkippedIcon} alt="player skipped icon" /> }

      <div className="team-list-item-actions">
        <button
          type="button"
          data-testid="skip-other-btn"
          onClick={() => skipMove(id)}
          disabled={status !== playerStatuses.ActionNotTaken}
        >
          <img alt="" src={Skip} />
        </button>
        <button
          type="button"
          data-testid="remove-other-player-btn"
          style={{ display: 'none' }}
          onClick={() => removePlayer(id)}
        >
          <img alt="" src={Remove} />
        </button>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  skipMove: PropTypes.func.isRequired,
  color: PropTypes.shape({
      background: PropTypes.shape({
          r: PropTypes.number,
          g: PropTypes.number,
          b: PropTypes.number,
      }),
      text: PropTypes.shape({
          r: PropTypes.number,
          g: PropTypes.number,
          b: PropTypes.number,
      })
  }).isRequired,
  removePlayer: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(playerStatuses)).isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(TeamMember);
