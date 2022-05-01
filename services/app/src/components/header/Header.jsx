import React from 'react';
import PropTypes from "prop-types";
import Logo from "./headerComponents/PlanningChessLogo.svg";
import Separator from "./headerComponents/SolidSeperator.svg";
import CopyLink from "./headerComponents/CopyLink.svg";
import Settings from "./headerComponents/Settings.svg";
import Info from "./headerComponents/Info.svg";

import '../../static/style/header.css';

const Header = ({ username }) => { 
  const avatarLetter = username[0];

  return (
    <div className="align-c" id="header">
      <div className="f-row align-c gap-m">
        <img src={Logo} alt="logo" />
        <img src={Separator} alt="separator" />
        <text>RoomNameExample </text>
        <img src={CopyLink} alt="nav-item" />
        <img src={Settings} alt="nav-item" />
        <img src={Info} alt="nav-item" />
      </div>

      <div className="f-1 justify-end align-c gap-s">
        <span className="f-center avatar">{avatarLetter}</span>
        <text id="username">{username}</text>
      </div>
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Header;
