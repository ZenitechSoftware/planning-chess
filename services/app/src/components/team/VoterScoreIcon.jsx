import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './team.css';
import { PlayerStatuses } from '../../constants/playerConstants';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { GameState } from '../../constants/gameConstants';

const VoterScoreIcon = ({ score, status }) => {
  const { gameState } = useChessBoardContext();

  if (status === PlayerStatuses.MoveSkipped) {
    return (
      <span className={classNames('team-list-voter-skip-score rubik-font weight-500 padding-x-s padding-y-xs font-size-xs border-r-20', {
          'current-move-score-icon': gameState === GameState.GAME_IN_PROGRESS,
        })}
      >
        Skipped
      </span>
    )
  }

  return (
    <span 
      data-testid="voter-score" 
      className={classNames('team-list-voter-score padding-x-s padding-y-xs font-size-xs border-r-20', {
      'current-move-score-icon weight-700': gameState === GameState.GAME_IN_PROGRESS,
      })}
    >
      {score}
    </span>
  )
};

VoterScoreIcon.defaultProps = {
  score: null,
}

VoterScoreIcon.propTypes = {
  score: PropTypes.number,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)).isRequired
};

export default VoterScoreIcon;