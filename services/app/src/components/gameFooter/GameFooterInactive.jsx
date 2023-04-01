import React from 'react';
import CopyIcon from '../../static/svg/CopyLink.svg';
const GameFooterInactive = () => {
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
      <p className="footer-inactive font-size-xl weight-800">
        Waiting for more players to join the game
      </p>
      <button
        type="button"
        className="copy-btn border-r-4 padding-sm gap-s align-c"
        data-testid="game-footer-copy-link-button"
        onClick={(e) => {
          e.preventDefault();
          copyUrl();
          const button = e.currentTarget;
          button.classList.toggle('clicked');
          setTimeout(() => {
            button.classList.toggle('clicked');
          }, 850);
        }}
      >
        <img
          src={CopyIcon}
          alt="copy link icon"
          className="copy-icon"
          style={{ zIndex: 0 }}
        />
        <p className="font-size-m margin-0" style={{ zIndex: 0 }}>
          Copy Link
        </p>
      </button>
    </>
  );
}

export default GameFooterInactive