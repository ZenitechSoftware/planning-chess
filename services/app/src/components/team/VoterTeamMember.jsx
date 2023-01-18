import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { playerWithScorePropType, playerPropType } from '../../prop-types/player';
import './team.css';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

import VoterRowName from './VoterRowName';
import VoterStatusIcons from './VoterStatusIcons';
import VoterRowActionButtons from './VoterRowActionButtons';
import { GameState } from '../../constants/gameConstants';
import VoterScoreIcon from './VoterScoreIcon';

const VoterTeamMember = ({ player, skipMove, index, currentPlayerId }) => {
  const { gameState } = useContext(ChessBoardContext);
  const { name, color, id, status, score } = player;

  return (
    <div className="team-list-item gap-m align-c padding-y-sm padding-x-" data-testid={`list-${name}-${index}`}>
      <VoterRowName
        name={name}
        color={color}
        currentPlayerId={currentPlayerId}
        id={id}
      />

      { gameState === GameState.GAME_IN_PROGRESS && (
        <VoterStatusIcons status={status} />
      )}

      { gameState === GameState.GAME_FINISHED && (
        <VoterScoreIcon score={score} />
      )}
      
      { id !== currentPlayerId && (
        <VoterRowActionButtons 
          id={id}
          status={status}
          skipMove={skipMove}
        />
      )}
    </div>
  )
};

VoterTeamMember.propTypes = {
  skipMove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  player: PropTypes.oneOfType([
    playerWithScorePropType,
    playerPropType,
  ]).isRequired,
};

export default VoterTeamMember;