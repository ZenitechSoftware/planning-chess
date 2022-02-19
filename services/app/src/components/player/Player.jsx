import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import '../../static/style/username.css';

const Player = ({ user, skipMove }) => (
  user && (
    <>
      <div id="userName">
        <span>{user.name}</span>
      </div>
      <button type="button" disabled={user.status !== playerStatuses.ActionNotTaken} onClick={() => skipMove(user.id)}>skip</button>
    </>
)
);
Player.defaultProps = {
  user: null,
};
Player.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.oneOf(Object.values(playerStatuses)),
    id: PropTypes.string,
  }),
  skipMove: PropTypes.func.isRequired,
};

export default Player;
