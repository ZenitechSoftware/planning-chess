/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

const ExplanatoryTooltip = ({ title, children, placement }) => (
  <Tooltip
    title={title}
    placement={placement}
    overlayInnerStyle={{ fontSize: 15 }}
  >
    {children}
  </Tooltip>
);

ExplanatoryTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ExplanatoryTooltip;
