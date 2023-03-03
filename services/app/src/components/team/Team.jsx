import React from 'react';
import PropTypes from 'prop-types';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import VoterTeamMember from './VoterTeamMember';
import SpectatorTeamMember from './SpectatorTeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import Return from '../../static/svg/Return.svg';
import './team.css';
import { GameState } from '../../constants/gameConstants';
import Button from '../button/Button';
import '../gameStatus/game-status.css';

const Team = ({ skipMove }) => {
  const { clearBoard, voters, spectators, votersListWithScores, gameState, currentPlayerId } = useChessBoardContext();
  
  return (
    <div className="team-container f-column">
      <div className='team-header'>
        <GameStatus />
        <GameInfo />
      </div>

      <div className="team-list-items padding-y-0 padding-x-xl">
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

      <div className="team-list-footer padding-y-m padding-x-0 align-c">
        <Button
          clickHandler={clearBoard}
          type='ghost'
          className='margin-auto'
          dataTestid='restart-game-btn'
        >
          <img alt="" src={Return} />
          {' '}
          Restart game
        </Button>
      </div>
    </div>
  );
}

Team.propTypes = {
  skipMove: PropTypes.func.isRequired,
};
export default Team;
