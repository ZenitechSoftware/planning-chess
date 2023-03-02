import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd'; 
import './button.css';

const Button = ({ size, clickHandler, children, type, isDisabled, className, htmlType, dataTestid }) => (
  <AntdButton
    disabled={isDisabled}
    htmlType={htmlType}
    type={type}
    size={size}
    data-testid={dataTestid}
    className={classNames('border-r-4 padding-y-s weight-500 padding-x-m gap-s f-center', className, {
      'ghost-btn': type === 'ghost',
      'primary-btn': type === 'primary',
    })}
    onClick={clickHandler}
  >
    {children}
  </AntdButton>
);


Button.defaultProps = {
  type: 'primary',
  isDisabled: false,
  className: undefined,
  size: 'default',
  htmlType: 'button',
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
  htmlType: PropTypes.oneOf(['button', 'submit']),
  dataTestid: PropTypes.string,
};

export default Button;