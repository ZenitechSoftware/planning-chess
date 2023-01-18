
import React from 'react'
import PropTypes from 'prop-types';
import './team.css';
import { PlayerStatuses } from '../../constants/playerConstants';

const VoterScoreIcon = ({ score, status }) => {
  if (status === PlayerStatuses.MoveSkipped) {
    return (
      <span className='team-list-voter-skip-score  rubik-font weight-500 padding-x-s padding-y-xs font-size-xs border-r-20'>Skipped</span>
    )
  }

  return (
    <span className='team-list-voter-score padding-x-s padding-y-xs font-size-xs border-r-20'>{score}</span>
  )
}

VoterScoreIcon.defaultProps = {
  score: null,
}

VoterScoreIcon.propTypes = {
  score: PropTypes.number,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)).isRequired
};

export default VoterScoreIcon;