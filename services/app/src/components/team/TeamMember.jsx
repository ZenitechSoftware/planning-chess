import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import Skip from '../../static/svg/Skip.svg';
import Remove from '../../static/svg/Remove.svg';
import './team.css';
import CheckMark from "../../static/svg/Checkmark.svg";
import { ChessBoardContext } from "../../contexts/ChessBoardContext"
import UserStatus from './UserStatus';



const TeamMember = ({ name, id, skipMove, color, status, removePlayer, index }) => {
  const {isAllTurnsMade} = useContext(ChessBoardContext);
  return (
  <div className="team-list-item align-c" data-testid={`list-${name}-${index}`}>
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
    {name}
    <UserStatus status={status} isAllTurnsMade={isAllTurnsMade}/>
    {isAllTurnsMade && <img src={CheckMark} className="team-list-item-icon" alt="player done icon" />}
    
    <div className="team-list-item-actions team-list-item-icon">
      <button
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
};

export default React.memo(TeamMember);
