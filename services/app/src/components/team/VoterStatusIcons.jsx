import React from 'react';
import PropTypes from 'prop-types';
import { PlayerStatuses } from '../../constants/playerConstants';
import CheckMark from "../../static/svg/Checkmark.svg";
import SkippedIcon from "../../static/svg/SkippedIcon.svg";

const VoterStatusIcons = ({ status }) => {
  if (status === PlayerStatuses.FigurePlaced) {
    return (
      <img 
        src={CheckMark} 
        className="team-list-item-icon" 
        alt="player done icon" 
      /> 
    )
  }

  if (status === PlayerStatuses.MoveSkipped) {
    return (
      <img 
        src={SkippedIcon} 
        className="team-list-item-icon" 
        alt="player skipped icon"  
      /> 
    )
  }

  return null;
}

VoterStatusIcons.propTypes = {
  status: PropTypes.oneOf(Object.values(PlayerStatuses)).isRequired,
};

export default VoterStatusIcons