import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import { getPlayerAvatarColor } from '../../helpers/getPlayerAvatarColor';
import Skip from './teamComponents/Skip.svg';
import Remove from './teamComponents/Remove.svg';
import '../../static/style/team.css';

function TeamMember({ name, id, skipMove, status, removePlayer }) {
  const playerColor = getPlayerAvatarColor();
  return (
    <div className="team-list-item">
      <div className="team-list-item-avatar" style={{
        backgroundColor: `rgb(${playerColor.background.r}, ${playerColor.background.g}, ${playerColor.background.b})`
      }}>
          <div 
            style={{
              color: `rgb(${playerColor.text.r}, ${playerColor.text.g}, ${playerColor.text.b})`
            }}
          >{name[0].toUpperCase()}</div>
      </div>
      {name}
      <div className="team-list-item-actions">
          <button onClick={() => skipMove(id)}><img src={Skip} /></button>
          <button onClick={() => removePlayer(id)}><img src={Remove} /></button>
        </div>
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
