import React from 'react';
import PropTypes from "prop-types";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import playerPropType from '../../prop-types/player';
import Logo from "./headerComponents/PlanningChessLogo.svg";
import Separator from "./headerComponents/SolidSeparator.svg";
import CopyLink from "./headerComponents/CopyLink.svg";
// import Settings from "./headerComponents/Settings.svg";
// import Info from "./headerComponents/Info.svg";
import { rgbToColor } from '../../helpers/rgbToColor';

import '../../static/style/header.css';

const Header = ({ player, roomUrl }) => { 
  const avatarLetter = player?.name[0];

  return (
    <div className="align-c" id="header">
      <div className="f-row align-c gap-m">
        <img src={Logo} alt="logo" />
        <img src={Separator} alt="separator" />
        {/* <span>RoomNameExample </span> */}
        <CopyToClipboard text={roomUrl}>
          <img src={CopyLink} alt="copy link" style={{ cursor: "pointer" }} />
        </CopyToClipboard>
        {/* <img src={Settings} alt="nav-item" /> */}
        {/* <img src={Info} alt="nav-item" /> */}
      </div>

      {player && (
        <div className="f-1 justify-end align-c gap-s">
          <span 
            className="f-center avatar"
            style={{
              color: rgbToColor(player.color.text),
              backgroundColor: rgbToColor(player.color.background),
            }}
          >
            {avatarLetter}
          </span>
          <span id="username">{player.name}</span>
        </div>
      )}
    </div>
  );
};
Header.defaultProps = {
  player: null,
};
Header.propTypes = {
  roomUrl: PropTypes.string.isRequired,
  player: playerPropType,
}

export default Header;
