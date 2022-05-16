import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import playerPropType from '../../prop-types/player';

const Player = ({ player, skipMove }) =>
  player && (
    <>
      {`${player.name} (you)`}
      <button
        type="button"
        disabled={player.status !== playerStatuses.ActionNotTaken}
        onClick={() => skipMove(player.id)}
      >
        skip
      </button>
    </>
  );
Player.defaultProps = {
  player: null,
};
Player.propTypes = {
  player: playerPropType,
  skipMove: PropTypes.func.isRequired,
};

export default Player;
