import React from 'react';
import Logo from '../../components/header/headerComponents/PlanningChessLogo.svg';
import Seperator from '../../components/header/headerComponents/SolidSeperator.svg';
import CopyLink from '../../components/header/headerComponents/CopyLink.svg';
import Settings from '../../components/header/headerComponents/Settings.svg';
import Info from '../../components/header/headerComponents/Info.svg';
import '../../static/style/header.css';

const Header = () => {
  return (
    <div id="header">
      <img src={Logo} id="logo" />
      <img src={Seperator} id="seperator" />
      <text id="roomName">RoomNameExample </text>
      <img src={CopyLink} id="copyLink" />
      <img src={Settings} id="settings" />
      <img src={Info} id="info" />
      <span id="letter">M</span>
      <text id="username">Mike</text>
    </div>
  );
};

export default Header;
