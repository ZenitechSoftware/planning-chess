import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import playerStatuses from '../../constants/playerStatuses';
import { PLAYER_ROLES } from '../../constants/playerConstants';
import Skip from '../../static/svg/Skip.svg';
import Remove from '../../static/svg/Remove.svg';
import './team.css';
import CheckMark from "../../static/svg/Checkmark.svg";
import SkippedIcon from "../../static/svg/SkippedIcon.svg";
import EyeIcon from '../../static/svg/EyeIcon.svg';

const TeamMember = ({ name, id, skipMove, color, status, removePlayer, index, currentPlayerId, role }) => {
  const isSpectator = role === PLAYER_ROLES.SPECTATOR;

  const defaultAvatar = (
    <div
      className="team-list-item-avatar align-c"
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
  );

  const spectatorAvatar = (
    <div 
      className="team-list-item-avatar align-c"
      style={{ backgroundColor: '#ECEDEE' }}
    >
      <img src={EyeIcon} alt="spectator icon" />
    </div>
  )

  
  return (
    <div className="team-list-item align-c" data-testid={`list-${name}-${index}`}>

      { 
        role === PLAYER_ROLES.SPECTATOR 
          ? spectatorAvatar
          : defaultAvatar
      }

      <div className="team-list-item-name">
        {name}
        {' '}
        { currentPlayerId === id && <span>(you)</span> }
      </div>
      
      { status === playerStatuses.FigurePlaced && <img src={CheckMark} className="team-list-item-icon" alt="player done icon" /> }
      { status === playerStatuses.MoveSkipped && <img src={SkippedIcon} className="team-list-item-icon" alt="player skipped icon" /> }
      
      <div className="team-list-item-actions team-list-item-icon">
        <button
          className={classnames({
            'display-none': isSpectator,
          })}
          type="button"
          onClick={() => skipMove(id)}
          disabled={status !== playerStatuses.ActionNotTaken}
        >
          <img alt="" src={Skip} />
        </button>
        <button
          type="button"
          style={{ display: 'none' }}
          onClick={() => removePlayer(id)}
        >
          <img alt="" src={Remove} />
        </button>
      </div>
    </div>
  )
};

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
  currentPlayerId: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default React.memo(TeamMember);
