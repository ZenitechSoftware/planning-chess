import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ clickHandler, text }) => (
  <button type="button" className='button border-r-4 padding-sm gap-s align-c' onClick={clickHandler}>
    <p className='font-size-m margin-0'>
      {text}
    </p>
  </button>
);

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
  

export default Button;