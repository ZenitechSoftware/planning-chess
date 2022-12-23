import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';


const ExplanatoryTooltip = ({
    title,
    children,
    placement
}) => {
  return (
    <Tooltip
      className="tooltipClass" 
      title={title}
      placement={placement}
      overlayInnerStyle={{fontSize: 15}}
    >
        {children}
    </Tooltip>
  );
};

ExplanatoryTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
};

export default ExplanatoryTooltip;
