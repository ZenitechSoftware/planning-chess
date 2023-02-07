import React from 'react';
import PropTypes from 'prop-types';

const GameLayoutSideArea = ({ children }) => (
  <div className='game-layout-side-area margin-b-s'>
    {children}
  </div>
);

GameLayoutSideArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default GameLayoutSideArea;