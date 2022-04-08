import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import userPropType from '../../prop-types/user';
import '../../static/style/team.css';

function Team({ title, users, skipMove, removePlayer }) {
  return (
    <div className="team-container">
      <h2>{title}</h2>
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
  );
}

Team.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(userPropType).isRequired,
  removePlayer: PropTypes.func.isRequired,
  skipMove: PropTypes.func.isRequired,
};
export default Team;
