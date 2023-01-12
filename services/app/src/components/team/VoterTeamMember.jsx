import React from 'react';
import PropTypes from 'prop-types';
import './team.css';
import playerPropType from '../../prop-types/player';
import { PlayerStatuses } from '../../constants/playerConstants';
import Skip from '../../static/svg/Skip.svg';
import CheckMark from "../../static/svg/Checkmark.svg";
import SkippedIcon from "../../static/svg/SkippedIcon.svg"

const VoterTeamMember = ({ player, skipMove, index, currentPlayerId }) => {
  const { name, color, id, status } = player;

  return (
    <div className="team-list-item align-c" data-testid={`list-${name}-${index}`}>
      <div
        className="team-list-item-avatar f-center"
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
    
      <div className="team-list-item-name">
        {name}
        {' '}
        { currentPlayerId === id && <span>(you)</span> }
      </div>
    
      { status === PlayerStatuses.FigurePlaced && (
        <img 
          src={CheckMark} 
          className="team-list-item-icon" 
          alt="player done icon" 
        /> 
      )}

      { status === PlayerStatuses.MoveSkipped && (
        <img 
          src={SkippedIcon} 
          className="team-list-item-icon" 
          alt="player skipped icon" 
        /> 
      )}
      
      { id !== currentPlayerId && (
        <div className="team-list-item-actions team-list-item-icon">
          <button
            type="button"
            onClick={() => skipMove(id)}
            disabled={status !== PlayerStatuses.ActionNotTaken}
          >
            <img alt="skip other player button icon" src={Skip} />
          </button>
        </div>
      )}
    </div>
  )
};

VoterTeamMember.propTypes = {
  player: playerPropType.isRequired,
  skipMove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
};

export default VoterTeamMember;