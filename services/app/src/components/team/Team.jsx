import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import TeamMember from './TeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import Return from '../../static/svg/Return.svg';
import './team.css';
import { useWebSockets } from '../../hooks/useWebSockets';

const Team = ({ skipMove, removePlayer }) => {
  const { clearBoard, voters, spectators } = useContext(ChessBoardContext);
  const { currentPlayerId } = useWebSockets();

  return (
    <div className="team-container">
      <GameStatus />
      <GameInfo />

      <div className="team-list-items">
        {voters?.map((player, index) => (
          <TeamMember
            key={player.id}
            index={index}
            name={player.name}
            id={player.id}
            skipMove={skipMove}
            color={player.color}
            status={player.status}
            removePlayer={removePlayer}
            currentPlayerId={currentPlayerId}
            role={player.role}
          />
        ))}
        {spectators?.map((player, index) => (
          <TeamMember
            key={player.id}
            index={index}
            name={player.name}
            id={player.id}
            skipMove={skipMove}
            color={player.color}
            status={player.status}
            removePlayer={removePlayer}
            currentPlayerId={currentPlayerId}
            role={player.role}
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
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
};
export default Team;
