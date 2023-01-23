import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

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
  placement: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default ExplanatoryTooltip;
