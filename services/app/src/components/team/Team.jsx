import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import userPropType from '../../prop-types/user';
import '../../static/style/team.css';

function Team({ title, users, skipMove, children }) {
  return (
    <div className="team-container">
      <h2>{title}</h2>
      <div className="team-list-item">{children}</div>
      {users.map((user) => (
        <TeamMember
          key={user.id}
          name={user.name}
          id={user.id}
          skipMove={skipMove}
          status={user.status}
        />
      ))}
    </div>
  );
}

Team.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(userPropType).isRequired,
  skipMove: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
export default Team;
