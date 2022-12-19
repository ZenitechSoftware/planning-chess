import React, { useMemo } from 'react';
import Header from './Header';
import RippleButton from '../rippleButton/RippleButton';
import Separator from "../../static/svg/SolidSeparator.svg";
import CopyLink from "../../static/svg/CopyLink.svg";
// import Settings from "../../static/svg/Settings.svg";
// import Info from "../../static/svg/Info.svg";
import { rgbToColor } from '../../helpers/rgbToColor';
import '../../static/style/layout.css';
import './header.css';
import { useWebSockets } from '../../hooks/useWebSockets';

const GameHeader = () => {
  const { players, currentPlayerId } = useWebSockets();

  const currentPlayer = useMemo(
    () => players.find((user) => user.id === currentPlayerId), 
    [players]
  );

  const avatarLetter = currentPlayer?.name[0];

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <Header>
      <div 
        className='f-row align-c gap-m header-info'
      >
        <img src={Separator} alt="separator" />
        {/* <span>RoomNameExample </span> */}

        <div className="copy-section">
          <RippleButton onClick={copyUrl} data-testid="copy-link-btn">
            <img src={CopyLink} alt="copy link" className="copy-icon" />
          </RippleButton>
        </div>

        {/* <img src={Settings} alt="nav-item" /> */}
        {/* <img src={Info} alt="nav-item" /> */}
      </div>

      {currentPlayer && (
        <div className="f-1 justify-end align-c gap-s">
          <span
            className="f-center avatar"
            style={{
              color: rgbToColor(currentPlayer.color.text),
              backgroundColor: rgbToColor(currentPlayer.color.background),
            }}
          >
            {avatarLetter}
          </span>
          <span id="username">{currentPlayer.name}</span>
        </div>
      )}
    </Header>
    
  );
};

export default GameHeader;
