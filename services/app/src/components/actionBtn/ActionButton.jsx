import React from 'react';
import PropTypes from 'prop-types';
import './actionButton.css';

const ActionButton = ({ clickHandler, text }) => (
  <button type="button" className='create-game-btn border-r-4 padding-sm gap-s align-c' onClick={clickHandler}>
    <p className='font-size-m margin-0'>
      {text}
    </p>
  </button>
);

ActionButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
  

export default ActionButton;