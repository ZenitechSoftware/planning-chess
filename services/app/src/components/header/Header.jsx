import React, { useMemo } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import RippleButton from '../rippleButton/RippleButton';
import Logo from "./headerComponents/PlanningChessLogo.svg";
import Separator from "./headerComponents/SolidSeparator.svg";
import CopyLink from "./headerComponents/CopyLink.svg";
// import Settings from "./headerComponents/Settings.svg";
// import Info from "./headerComponents/Info.svg";
import { rgbToColor } from '../../helpers/rgbToColor';
import '../../static/style/layout.css';
import './header.css';
import { useWebSockets } from '../../utils/useWebSockets';

const Header = ({ isGameMode }) => {
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
    <div className="align-c" id="header">
      <img src={Logo} alt="logo" className='margin-r-m' />
      <div 
        className={classNames('f-row align-c gap-m header-info', {
          'display-none-i': !isGameMode,
        })}
      >
        <img src={Separator} alt="separator" />
        {/* <span>RoomNameExample </span> */}

        <div className="copy-section">
          <RippleButton onClick={copyUrl}>
            <img src={CopyLink} alt="copy link" className="copy-icon" />
          </RippleButton>
        </div>

        {/* <img src={Settings} alt="nav-item" /> */}
        {/* <img src={Info} alt="nav-item" /> */}
      </div>

      {currentPlayer && isGameMode && (
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
    </div>
  );
};

Header.propTypes = {
  isGameMode: PropTypes.bool.isRequired,
}

export default Header;
