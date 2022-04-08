import React from 'react';
import PropTypes from 'prop-types';
import playerStatuses from '../../constants/playerStatuses';
import userPropType from '../../prop-types/user';
import '../../static/style/username.css';

const Player = ({ user, skipMove, score }) =>
  user && (
    <>
      <div id="userName">
        <span>{user.name}</span>
        <p>{score}</p>
      </div>
      <button
        type="button"
        disabled={user.status !== playerStatuses.ActionNotTaken}
        onClick={() => skipMove(user.id)}
      >
        skip
      </button>
    </>
  );
Player.defaultProps = {
  user: null,
};
Player.propTypes = {
  user: userPropType,
  skipMove: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default Player;
