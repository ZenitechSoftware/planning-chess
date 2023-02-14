import React from 'react';
import CopyIcon from '../../static/svg/CopyLink.svg';

const GameFooterInactive = () => {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
      <p className='footer-inactive font-size-xl weight-800'>Waiting for more players to join the game</p>
      <button type="button" className='copy-btn border-r-4 padding-sm gap-s align-c' data-testid='game-footer-copy-link-button' onClick={copyUrl}>
        <img src={CopyIcon} alt="copy link icon" className="copy-icon" />
        <p className='font-size-m margin-0'>Copy Link</p>
      </button>
    </>
  )
}

export default GameFooterInactive