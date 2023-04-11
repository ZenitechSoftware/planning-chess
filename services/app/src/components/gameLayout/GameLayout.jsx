import React from 'react';
import PropTypes from 'prop-types';
import './gameLayout.css';

const GameLayout = ({ children }) => (
  <div className='game-view margin-t-m margin-b-s gap-sm'>
    {children}
  </div>
);

GameLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default GameLayout;
