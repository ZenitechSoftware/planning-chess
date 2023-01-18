import React from 'react';
import PropTypes from 'prop-types';
import './ctaBtn.css';

const BlueCTAButton = ({ clickHandler, text, children }) => (
  <button type="button" className='create-game-btn padding-sm gap-s align-c' onClick={clickHandler}>
    {children}
    <p className='font-size-m margin-0'>
      {text}
    </p>
  </button>
);

BlueCTAButton.defaultProps = {
  children: null,
}

BlueCTAButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element
  ])
};
  

export default BlueCTAButton;