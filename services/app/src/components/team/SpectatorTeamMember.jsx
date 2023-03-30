import React from 'react';
import PropTypes from 'prop-types'; 
import './team.css';
import EyeIcon from '../../static/svg/EyeIcon.svg';

const SpectatorTeamMember = ({ index, name, spectatorId, currentPlayerId }) => (
  <div className="team-list-item gap-m align-c padding-y-sm padding-x-0" data-testid={`list-${name}-${index}`}>
    <div className="team-list-item-avatar spectator-avatar f-center" data-testId={`spectator-avatar-${spectatorId}`}>
      <img src={EyeIcon} alt="spectator icon" />
    </div>

    <div className="team-list-item-name">
      {name}
      {' '}
      { currentPlayerId === spectatorId && <span className='font-size-xs'>(you)</span> }
    </div>
  </div>
);

SpectatorTeamMember.defaultProps = {
  currentPlayerId: null,
}

SpectatorTeamMember.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.string,
  spectatorId: PropTypes.string.isRequired,
};

export default SpectatorTeamMember;