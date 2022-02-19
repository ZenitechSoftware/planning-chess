import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';

function TeamMember({ name, id, skipMove, status }) {
  return (
    <>
      {name}
      <button
        type="button"
        disabled={status !== playerStatuses.ActionNotTaken}
        onClick={() => skipMove(id)}
      >
        skip
      </button>
    </>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  skipMove: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(playerStatuses)).isRequired,
};

export default TeamMember;
