import React from 'react'
import PropTypes from 'prop-types'
// import './PlanningChessTooltip.css'
import classnames from 'classnames';
import { Tooltip } from "antd";

const PlanningChessTooltip = ({ className, children, hideArrow, ...rest}) => (
  <Tooltip
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    open
    className='custom-tooltip'
    overlayClassName={classnames({
      'tooltip-arrow-hidden': hideArrow,
    })}
  >
    <div className='f-center'>{children}</div>
  </Tooltip>
)

PlanningChessTooltip.defaultProps = {
  children: null,
  hideArrow: false,
  handleClick: null,
  className: undefined,
}

PlanningChessTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  hideArrow: PropTypes.bool,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

export default PlanningChessTooltip;