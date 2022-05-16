import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import playerPropType from '../../prop-types/player';
import '../../static/style/team.css';

function Team({ title, players, skipMove, children, removePlayer }) {
  return (
    <div className="team-container">
      <h2>{title}</h2>
      <div className="team-list-item">{children}</div>
      {players.map((user) => (
        <TeamMember
          key={user.id}
          name={user.name}
          id={user.id}
          skipMove={skipMove}
          status={user.status}
          removePlayer={removePlayer}
        />
      ))}
    </div>
  );
}

Team.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(playerPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default Team;
