import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import VoterTeamMember from './VoterTeamMember';
import SpectatorTeamMember from './SpectatorTeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import Return from '../../static/svg/Return.svg';
import './team.css';
import { useWebSockets } from '../../hooks/useWebSockets';
import { GameState } from '../../constants/gameConstants';

const Team = ({ skipMove }) => {
  const { clearBoard, voters, spectators, votersListWithScores, gameState } = useContext(ChessBoardContext);
  const { currentPlayerId } = useWebSockets();

  return (
    <div className="team-container">
      <GameStatus />
      <GameInfo />

      <div className="team-list-items">
        { gameState !== GameState.GAME_FINISHED && 
            voters?.map((player, index) => (
              <VoterTeamMember
                player={player}
                key={player.id}
                index={index}
                skipMove={skipMove}
                currentPlayerId={currentPlayerId}
              />
        ))}

        { gameState === GameState.GAME_FINISHED && 
            votersListWithScores?.map((player, index) => (
              <VoterTeamMember
                player={player}
                key={player.id}
                index={index}
                skipMove={skipMove}
                currentPlayerId={currentPlayerId}
              />
        ))}

        {spectators?.map((player, index) => (
          <SpectatorTeamMember
            key={player.id}
            index={index}
            name={player.name}
            id={player.id}
            currentPlayerId={currentPlayerId}
          />
        ))}
      </div>
      <div className="team-list-footer">
        <button type="button" data-testid="restart-game-btn" disabled={false} onClick={clearBoard}>
          <img alt="" src={Return} />
          {' '}
          Restart game
        </button>
      </div>
    </div>
  );
}

Team.propTypes = {
  skipMove: PropTypes.func.isRequired,
};
export default Team;
