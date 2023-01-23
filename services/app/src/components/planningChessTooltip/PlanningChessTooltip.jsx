import React from 'react'
import PropTypes from 'prop-types'
// import './PlanningChessTooltip.css'
import classnames from 'classnames';
import { Tooltip } from "antd";

const PlanningChessTooltip = ({ title, isArrowNeeded, children, handleClick }) => (
  <Tooltip
    className={classnames('custom-tooltip', {
      'tooltip-arrow-hidden': !isArrowNeeded,
    })}
    open
    title={title}
    onClick={handleClick}
  >
    <div className='f-center gap-s'>{children}</div>
  </Tooltip>
)

PlanningChessTooltip.defaultProps = {
  children: null,
  isArrowNeeded: true,
  handleClick: null,
}

PlanningChessTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  isArrowNeeded: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default PlanningChessTooltip;