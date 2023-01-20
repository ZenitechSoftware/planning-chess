import React from 'react';
import PropTypes from 'prop-types'; 
import './team.css';
import EyeIcon from '../../static/svg/EyeIcon.svg';

const SpectatorTeamMember = ({ index, name, id, currentPlayerId }) => (
  <div className="team-list-item gap-m align-c padding-y-sm padding-x-0" data-testid={`list-${name}-${index}`}>
    <div className="team-list-item-avatar spectator-avatar f-center">
      <img src={EyeIcon} alt="spectator icon" />
    </div>

    <div className="team-list-item-name">
      {name}
      {' '}
      { currentPlayerId === id && <span className='font-size-xs'>(you)</span> }
    </div>
  </div>
);

SpectatorTeamMember.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  currentPlayerId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SpectatorTeamMember;