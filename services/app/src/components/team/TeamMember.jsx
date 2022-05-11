import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import '../../static/style/team.css';

function TeamMember({ name, id, skipMove, status, removePlayer }) {
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
      <button type="button" onClick={() => removePlayer(id)}>
        remove
      </button>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  skipMove: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(playerStatuses)).isRequired,
};

export default React.memo(TeamMember);
