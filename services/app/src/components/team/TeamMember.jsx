import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import '../../static/style/team.css';

function TeamMember({ name, id, skipMove, status }) {
  return (
    <div className="team-list-item">
      {name}
      <button
        type="button"
        disabled={status !== playerStatuses.ActionNotTaken}
        onClick={() => skipMove(id)}
      >
        skip
      </button>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  skipMove: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(playerStatuses)).isRequired,
};

export default TeamMember;
