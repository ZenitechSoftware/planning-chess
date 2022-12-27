import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import TeamMember from './TeamMember';
import GameStatus from '../gameStatus/GameStatus';
import GameInfo from '../gameStatus/GameInfo';
import playerPropType from '../../prop-types/player';
import Return from '../../static/svg/Return.svg';
import './team.css';

const Team = ({ players, skipMove, children, removePlayer, playerCount }) => {
  const { clearBoard } = useContext(ChessBoardContext);

  return (
    <div className="team-container">
      <GameStatus />
      <GameInfo playerCount={playerCount} />

      <div className="team-list-items">
        <div className="team-list-item align-c rubik-font" data-testid="list-current-player">{children}</div>
        {players?.map((player, index) => (
          <TeamMember
            key={player.id}
            index={index}
            name={player.name}
            id={player.id}
            skipMove={skipMove}
            color={player.color}
            status={player.status}
            removePlayer={removePlayer}
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
  players: PropTypes.arrayOf(playerPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  playerCount: PropTypes.number.isRequired,
};
export default Team;
