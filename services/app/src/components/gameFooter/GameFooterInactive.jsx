import React from 'react';
import CopyIcon from '../../static/svg/CopyLink.svg';
import './gameFooter.css';

const GameFooterInactive = () => {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
      <p className='footer-inactive font-size-xl weight-800'>Waiting for more players to join the game</p>
      <button type="button" className='copy-btn border-r-4 padding-sm gap-s align-c' onClick={copyUrl}>
        <img src={CopyIcon} alt="copy link icon" className="copy-icon" />
        <p className='font-size-m margin-0'>Copy Link</p>
      </button>
    </>
  )
}

export default GameFooterInactive