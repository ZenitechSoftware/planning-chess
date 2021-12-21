import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ name }) => {
  
  return (
    <div>
      <span>{name}</span>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string,
};

export default Player;
