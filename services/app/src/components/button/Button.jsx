import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd'; 
import './button.css';

const Button = ({ clickHandler, children, variant }) => (
  <AntdButton
    type={variant}
    className={classNames('button border-r-4 padding-y-s weight-500 padding-x-m gap-s f-center align-c', {
      'outlined-btn': variant === 'outlined',
      'primary-btn': variant === 'primary',
    })}
    onClick={clickHandler}
  >
    {children}
  </AntdButton>
);


Button.defaultProps = {
  variant: 'primary',
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  variant: PropTypes.oneOf(['outlined', 'primary']),
};

export default Button;