import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tooltip } from "antd";

const PlanningChessTooltip = ({ testid, className, children, hideArrow, ...rest}) => (
  <Tooltip
    {...rest}
    id={testid}
    // data-testid={dataTestid}
    className='custom-tooltip'
    overlayClassName={classnames({
      'tooltip-arrow-hidden': hideArrow,
    })}
  >
    {children}
  </Tooltip>
)

PlanningChessTooltip.defaultProps = {
  children: null,
  hideArrow: false,
  handleClick: null,
  className: undefined,
  title: null,
  testid: null,
}

PlanningChessTooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  hideArrow: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  testid: PropTypes.string,
};

export default PlanningChessTooltip;