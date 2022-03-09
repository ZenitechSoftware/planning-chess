import React from 'react';
import Logo from '../../components/header/headerComponents/PlanningChessLogo.svg';
import Separator from '../../components/header/headerComponents/SolidSeperator.svg';
import CopyLink from '../../components/header/headerComponents/CopyLink.svg';
import Settings from '../../components/header/headerComponents/Settings.svg';
import Info from '../../components/header/headerComponents/Info.svg';
import '../../static/style/header.css';

const Header = () => {
  return (
    <div id="header">
      <img src={Logo} id="logo" />
      <img src={Separator} id="separator" />
      <text id="roomName">RoomNameExample </text>
      <img src={CopyLink} className="nav-items-container" />
      <img src={Settings} className="nav-items-container" />
      <img src={Info} className="nav-items-container" />
      <span class="avatar">M</span>
      <text id="username">Mike</text>
    </div>
  );
};

export default Header;
