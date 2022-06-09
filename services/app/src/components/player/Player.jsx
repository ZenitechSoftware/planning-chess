import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import userPropType from '../../prop-types/user';
import { getPlayerAvatarColor } from '../../helpers/getPlayerAvatarColor';
import Skip from '../team/teamComponents/Skip.svg';

const Player = ({ user, skipMove }) => {
  const playerColor = getPlayerAvatarColor();
  return (
    user && (
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
            {user.name[0].toUpperCase()}
          </div>
        </div>
        <div className="team-list-item-name">
          {user.name} <span>(you)</span>
        </div>
        <div className="team-list-item-actions">
          <button
            type="button"
            onClick={() => skipMove(user.id)}
            disabled={user.status !== playerStatuses.ActionNotTaken}
          >
            <img alt="" src={Skip} />
          </button>
        </div>
      </>
    )
  );
};
Player.defaultProps = {
  user: null,
};
Player.propTypes = {
  user: userPropType,
  skipMove: PropTypes.func.isRequired,
};

export default Player;
