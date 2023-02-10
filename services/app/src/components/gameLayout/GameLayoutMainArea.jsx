import React from 'react';
import PropTypes from 'prop-types';
import './gameLayout.css';

const GameLayoutMainArea = ({ children }) => (
  <div className='game-layout-main-area f-column align-c'>
    {children}
  </div>
);

GameLayoutMainArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default GameLayoutMainArea