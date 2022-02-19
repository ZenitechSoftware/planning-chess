import React from 'react';
import PropTypes from 'prop-types';
import TeamMember from './TeamMember';
import playerStatuses from '../../constants/playerStatuses';

function Team({ title, users, skipMove }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h2>{title}</h2>
      <div>
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
    </div>
  );
}

Team.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.oneOf(Object.values(playerStatuses)),
    }),
  ).isRequired,
  skipMove: PropTypes.func.isRequired,
};
export default Team;
