import React from 'react';
import PropTypes from 'prop-types'; 
import './team.css';
import EyeIcon from '../../static/svg/EyeIcon.svg';

const SpectatorTeamMember = ({ index, name, id, currentPlayerId }) => (
  <div className="team-list-item align-c" data-testid={`list-${name}-${index}`}>
    <div className="team-list-spectator-avatar align-c">
      <img src={EyeIcon} alt="spectator icon" />
    </div>

    <div className="team-list-item-name">
      {name}
      {' '}
      { currentPlayerId === id && <span>(you)</span> }
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