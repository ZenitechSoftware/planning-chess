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

const VoterTeamMember = ({ player, skipMove, index, currentPlayerId }) => {
  const { gameState } = useChessBoardContext();
  
  return (
    <div className="team-list-item gap-m align-c padding-y-sm padding-x-" data-testid={`list-${player.name}-${index}`}>
      <VoterRow
        name={player.name}
        color={player.color}
        currentPlayerId={currentPlayerId}
        id={player.id}
        addOn={(
          <>
            { gameState === GameState.GAME_IN_PROGRESS && (
              <VoterStatusIcons status={player.status} />
            )}
      
            { gameState === GameState.GAME_FINISHED && (
              <VoterScoreIcon 
                score={player.score} 
                status={player.status}
              />
            )}
            
            { player.id !== currentPlayerId 
                && gameState === GameState.GAME_IN_PROGRESS
                && (
                  <VoterRowActionButtons 
                    onSkipMove={() => skipMove(player.id)}
                    status={player.status}
                  />
            )}  
          </>
        )}
      />
    </div>
  )
};

VoterTeamMember.defaultProps = {
  skipMove: null,
}

VoterTeamMember.propTypes = {
  skipMove: PropTypes.func,
  index: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  player: PropTypes.oneOfType([
    playerWithScorePropType,
    playerPropType,
  ]).isRequired,
};

export default VoterTeamMember;