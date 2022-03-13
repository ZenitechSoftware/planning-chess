import React from 'react';
import Logo from '../../components/header/headerComponents/PlanningChessLogo.svg';
import Separator from '../../components/header/headerComponents/SolidSeperator.svg';
import CopyLink from '../../components/header/headerComponents/CopyLink.svg';
import Settings from '../../components/header/headerComponents/Settings.svg';
import Info from '../../components/header/headerComponents/Info.svg';
import '../../static/style/header.css';

const Header = () => (
  <div id="header" className="px-xl">
    <div className="flex-row gap-md">
      <img src={Logo} />
      <img src={Separator} />
      <text id="roomName">RoomNameExample </text>
      <img src={CopyLink} />
      <img src={Settings} />
      <img src={Info} />
    </div>
    <div className="flex-row">
      <span className="avatar">M</span>
      <text id="username" className="font-md">
        Mike
      </text>
    </div>
  </div>
);

export default Header;
