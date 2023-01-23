import React from 'react';
import './header.css';
import Button from '../button/Button';
import CopyLink from "../../static/svg/CopyLink.svg";
import PlanningChessTooltip from '../planningChessTooltip/PlanningChessTooltip';

const CopyBtn = () => {
  const copyUrl = () => {
      navigator.clipboard.writeText(window.location.href);
  }

  return (
    <PlanningChessTooltip 
      title="Link copied to clipboard" 
      isArrowNeeded={false}
    >
      <Button clickHandler={copyUrl} variant='outlined'>
        <img src={CopyLink} alt="copy link" className="copy-icon" />
        <span>Copy Link</span>
      </Button>
    </PlanningChessTooltip>
  )
};

export default CopyBtn