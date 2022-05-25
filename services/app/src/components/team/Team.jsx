import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import userPropType from '../../prop-types/user';
import Return from './teamComponents/Return.svg';
import '../../static/style/team.css';

function Team({ title, users, skipMove, children, removePlayer }) {

  const playerCount = Array.isArray(users) && users.length > 0 ? `${users.length + 1} players` : '1 player';

  return (
    <div className="team-container">

      <div className="team-heading">{title}</div>
      <div className="team-list-count">
        {playerCount}
      </div>

      <div className="team-list-items">
        <div className="team-list-item">{children}</div>
        {users.map((user) => (
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
      <div className="team-list-footer">
        <button><img src={Return} /> Restart game</button>
      </div>
    </div>
  );
}

Team.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(userPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default Team;
