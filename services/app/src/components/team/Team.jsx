import React, { useContext } from 'react';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import playerPropType from '../../prop-types/player';
import Return from './teamComponents/Return.svg';
import './team.css';

function Team({ players, skipMove, children, removePlayer, playerCount, canPlay, clearBoard }) {
  const { turns } = useContext(ChessBoardContext);

  const restartBtnChecker = () => {
    if(!canPlay || turns !== players.length) return true;
    return false;
  }

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
        <button type="button" disabled={restartBtnChecker()} onClick={clearBoard}>
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
  canPlay: PropTypes.bool.isRequired,
  clearBoard: PropTypes.func.isRequired,
};
export default Team;
