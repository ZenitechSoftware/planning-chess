import React from 'react';
import PropTypes from 'prop-types';
import '../../static/style/username.css';

const Player = ({ name }) => (
  <div id="userName">
    <span>{name}</span>
  </div>
);
Player.defaultProps = {
  name: '',
};
Player.propTypes = {
  name: PropTypes.string,
};

export default Player;
