import React from 'react';
import PropTypes from 'prop-types';
import { PlayerStatuses } from '../../constants/playerConstants';
import Skip from '../../static/svg/Skip.svg';

const VoterRowActionButtons = ({ status, onSkipMove }) => (
  <div className="team-list-item-actions team-list-item-icon margin-r-xs">
    <button
      type="button"
      onClick={onSkipMove}
      disabled={status !== PlayerStatuses.ActionNotTaken}
    >
      <img alt="skip other player button icon" data-testid="skip-other-player-move" src={Skip} />
    </button>
  </div>
)

VoterRowActionButtons.defaultProps = {
  onSkipMove: null,
}

VoterRowActionButtons.propTypes = {
  status: PropTypes.oneOf(Object.values(PlayerStatuses)).isRequired,
  onSkipMove: PropTypes.func,
};

export default VoterRowActionButtons;