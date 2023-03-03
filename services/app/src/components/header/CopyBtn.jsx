import React, { useState, useEffect } from 'react';
import './header.css';
import { TOOLTIP_TIMEOUT } from '../../constants/appConstants';
import Button from '../button/Button';
import CopyLink from "../../static/svg/CopyLink.svg";
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';

const CopyBtn = () => {
  const [isCopyTooltipOpen, setIsCopyTooltipOpen] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopyTooltipOpen(true);
  };

  useEffect(() => {
    let timeout;
    if (isCopyTooltipOpen) {
      timeout = setTimeout(() => {
        setIsCopyTooltipOpen(false);
      }, TOOLTIP_TIMEOUT);
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [isCopyTooltipOpen]);

  return (
    <PlanningChessTooltip 
      title="Link copied to clipboard" 
      hideArrow
      open={isCopyTooltipOpen}
    >
      <Button clickHandler={copyUrl} type='ghost' dataTestid='game-header-copy-link-button'>
        <img src={CopyLink} alt="copy link" className="copy-icon" />
        <span>Copy Link</span>
      </Button>
    </PlanningChessTooltip>
  )
};

export default CopyBtn