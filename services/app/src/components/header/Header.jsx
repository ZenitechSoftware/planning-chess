import React from 'react';
import PropTypes from "prop-types";
import RippleButton from '../rippleButton/RippleButton';
import Logo from "./headerComponents/PlanningChessLogo.svg";
import Separator from "./headerComponents/SolidSeparator.svg";
import CopyLink from "./headerComponents/CopyLink.svg";
// import Settings from "./headerComponents/Settings.svg";
// import Info from "./headerComponents/Info.svg";

import '../../static/style/header.css';

const Header = ({ username, roomUrl }) => { 
  const avatarLetter = username[0];

  const copyUrl = () => {
    navigator.clipboard.writeText(roomUrl);
  }

  return (
    <div className="align-c" id="header">
      <div className="f-row align-c gap-m">
        <img src={Logo} alt="logo" />
        <img src={Separator} alt="separator" />
        {/* <span>RoomNameExample </span> */}

        <div className="copy-section">
          <RippleButton roomUrl={roomUrl} onClick={copyUrl}>
            <img src={CopyLink} alt="copy link" className="copy-icon" />
          </RippleButton>
        </div>
        
        {/* <img src={Settings} alt="nav-item" /> */}
        {/* <img src={Info} alt="nav-item" /> */}
      </div>

      <div className="f-1 justify-end align-c gap-s">
        <span className="f-center avatar">{avatarLetter}</span>
        <span id="username">{username}</span>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
  roomUrl: PropTypes.string.isRequired,
}

export default Header;
