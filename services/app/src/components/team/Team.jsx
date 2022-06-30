import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import TeamMember from './TeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import playerPropType from '../../prop-types/player';
import Return from './teamComponents/Return.svg';
import './team.css';

function Team({ players, skipMove, children, removePlayer, playerCount }) {
  const { isAllTurnsMade, clearBoard } = useContext(ChessBoardContext);

  return (
    <div className="team-container">
      <GameStatus />
      <GameInfo playerCount={playerCount} />

      <div className="team-list-items">
        <div className="team-list-item">{children}</div>
        {players.map((player) => (
          <TeamMember
            key={player.id}
            name={player.name}
            id={player.id}
            skipMove={skipMove}
            status={player.status}
            removePlayer={removePlayer}
          />
        ))}
      </div>
      <div className="team-list-footer">
        <button type="button" disabled={!isAllTurnsMade} onClick={clearBoard}>
          <img alt="" src={Return} />
          {' '}
          Restart game
        </button>
      </div>
    </div>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(playerPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  playerCount: PropTypes.number.isRequired,
};
export default Team;
