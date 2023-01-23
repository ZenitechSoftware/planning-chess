import React, { useState } from 'react';
import './header.css';
import Button from '../button/Button';
import CopyLink from "../../static/svg/CopyLink.svg";
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';

const CopyBtn = () => {
  const [isCopyTooltipOpen, setIsCopyTooltipOpen] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopyTooltipOpen(true);

    setTimeout(() => {
      setIsCopyTooltipOpen(false);
    }, 2000)
  };

  return (
    <PlanningChessTooltip 
      title="Link copied to clipboard" 
      hideArrow
      open={isCopyTooltipOpen}
    >
      <Button clickHandler={copyUrl} variant='outlined'>
        <img src={CopyLink} alt="copy link" className="copy-icon" />
        <span>Copy Link</span>
      </Button>
    </PlanningChessTooltip>
  )
};

export default CopyBtn