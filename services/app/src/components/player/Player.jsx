import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import playerPropType from '../../prop-types/player';
import Skip from '../team/teamComponents/Skip.svg';

const Player = ({ player, skipMove }) => {
  return (
    player && (
      <>
        <div
          className="team-list-item-avatar"
          style={{
            backgroundColor: `rgb(${player.background.r}, ${player.background.g}, ${player.background.b})`,
          }}
        >
          <div
            className="team-list-item-avatar-text"
            style={{
              color: `rgb(${player.text.r}, ${player.text.g}, ${player.text.b})`,
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
