
import React from 'react'
import PropTypes from 'prop-types';
import './team.css';

const VoterScoreIcon = ({ score }) => {
  if (score === 0) {
    return (
      <span className='team-list-voter-skip-score padding-x-s padding-y-xs font-size-xs'>Skipped</span>
    )
  }

  return (
    <span className='team-list-voter-score padding-x-s padding-y-xs font-size-xs'>{score}</span>
  )
}

VoterScoreIcon.propTypes = {
    score: PropTypes.number.isRequired,
};

export default VoterScoreIcon;