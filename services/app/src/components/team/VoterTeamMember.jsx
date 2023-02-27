import React from 'react';
import PropTypes from 'prop-types';
import { playerWithScorePropType, playerPropType } from '../../prop-types/player';
import './team.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import VoterRow from './VoterRow';
import VoterStatusIcons from './VoterStatusIcons';
import VoterRowActionButtons from './VoterRowActionButtons';
import { GameState } from '../../constants/gameConstants';
import VoterScoreIcon from './VoterScoreIcon';
import { PlayerStatuses } from '../../constants/playerConstants';

const VoterTeamMember = ({ player, skipMove, index, currentPlayerId }) => {
  const { gameState } = useChessBoardContext();

  const inProgressAddons = [
    <VoterStatusIcons 
      status={player.status} 
      key={`${player.id}statusIcon`}
    />
  ];

  if (player.id !== currentPlayerId && player.status === PlayerStatuses.ActionNotTaken) {
    inProgressAddons.push(
      <VoterRowActionButtons 
        onSkipMove={() => skipMove(player.id)}
        status={player.status}
        key={`${player.id}actionBtn`}
      />
    )
  }

  const finishedGameAddons = [
    <VoterScoreIcon 
      score={player.score} 
      status={player.status}
      key={`${player.id}finalScore`}
    />
  ];
  
  return (
    <div className="team-list-item gap-m align-c padding-y-sm padding-x-" data-testid={`list-${player.name}-${index}`}>
      <VoterRow
        name={player.name}
        currentPlayerId={currentPlayerId}
        playerId={player.id}
        addon={(
          <>
            {gameState === GameState.GAME_IN_PROGRESS && inProgressAddons}
            {gameState === GameState.GAME_FINISHED && finishedGameAddons}
          </>
        )}
      />
    </div>
  )
};

VoterTeamMember.defaultProps = {
  skipMove: null,
  currentPlayerId: null,
}

VoterTeamMember.propTypes = {
  skipMove: PropTypes.func,
  index: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.string,
  player: PropTypes.oneOfType([
    playerWithScorePropType,
    playerPropType,
  ]).isRequired,
};

export default VoterTeamMember;