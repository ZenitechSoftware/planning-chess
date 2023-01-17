import React from 'react';
import PropTypes from 'prop-types';
import { PlayerStatuses } from '../../constants/playerConstants';
import Skip from '../../static/svg/Skip.svg';

const VoterRowActionButtons = ({ status, skipMove, id }) => (
  <div className="team-list-item-actions team-list-item-icon">
    <button
      type="button"
      onClick={() => skipMove(id)}
      disabled={status !== PlayerStatuses.ActionNotTaken}
    >
      <img alt="skip other player button icon" src={Skip} />
    </button>
  </div>
)

VoterRowActionButtons.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(PlayerStatuses)).isRequired,
  skipMove: PropTypes.func.isRequired,
};

export default VoterRowActionButtons;