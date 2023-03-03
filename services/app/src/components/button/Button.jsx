import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd'; 
import './button.css';

const Button = ({ size, clickHandler, children, type, isDisabled, className, dataTestid }) => (
  <AntdButton
    disabled={isDisabled}
    type={type}
    size={size}
    className={classNames('border-r-4 padding-y-s weight-500 padding-x-m gap-s f-center', className, {
      'ghost-btn': type === 'ghost',
      'primary-btn': type === 'primary',
    })}
    onClick={clickHandler}
    data-testid={dataTestid}
  >
    {children}
  </AntdButton>
);


Button.defaultProps = {
  type: 'primary',
  isDisabled: false,
  className: undefined,
  size: 'default',
  dataTestid: null,
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  type: PropTypes.oneOf(['ghost', 'primary']),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'default']),
  dataTestid: PropTypes.string,
};

export default Button;