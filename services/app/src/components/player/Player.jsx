import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import playerPropType from '../../prop-types/player';
import { getPlayerAvatarColor } from '../../helpers/getPlayerAvatarColor';
import Skip from '../team/teamComponents/Skip.svg';

const Player = ({ player, skipMove }) => {
  const playerColor = getPlayerAvatarColor();
  return (
    player && (
      <>
        <div
          className="team-list-item-avatar"
          style={{
            backgroundColor: `rgb(${playerColor.background.r}, ${playerColor.background.g}, ${playerColor.background.b})`,
          }}
        >
          <div
            className="team-list-item-avatar-text"
            style={{
              color: `rgb(${playerColor.text.r}, ${playerColor.text.g}, ${playerColor.text.b})`,
            }}
          >
            {player.name[0].toUpperCase()}
          </div>
        </div>
        <div className="team-list-item-name">
          {player.name} 
          {' '}
          <span>(you)</span>
        </div>
        <div className="team-list-item-actions">
          <button
            type="button"
            onClick={() => skipMove(player.id)}
            disabled={player.status !== playerStatuses.ActionNotTaken}
          >
            <img alt="" src={Skip} />
          </button>
        </div>
      </>
    )
  );
};
Player.defaultProps = {
  player: null,
};
Player.propTypes = {
  player: playerPropType,
  skipMove: PropTypes.func.isRequired,
};

export default Player;
