import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { TooltipPlacements } from '../../constants/tooltipPlacements';

const ExplanatoryTooltip = ({ title, children, placement }) => (
  <Tooltip
    title={title}
    placement={placement}
  >
    {children}
  </Tooltip>
);

ExplanatoryTooltip.defaultProps = {
  title: null,
  placement: null,
}

ExplanatoryTooltip.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.oneOf(TooltipPlacements),
  children: PropTypes.element.isRequired,
};

export default ExplanatoryTooltip;
