import React from 'react';
import Header from './Header';
import { rgbToColor } from '../../helpers/rgbToColor';
import './header.css';
import Separator from "../../static/svg/SolidSeparator.svg";
import CopyBtn from './CopyBtn';
import CreateNewRoomBtn from './CreateNewRoomBtn';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const GameHeader = () => {
  const { currentPlayer } = useChessBoardContext();
  const avatarLetter = currentPlayer?.name[0];

  return (
    <Header>
      <div 
        className='f-1 align-c justify-between gap-m header-info'
      >
        <img src={Separator} alt="separator" />
        <div className='f-1 justify-between'>
          <CopyBtn />
          <CreateNewRoomBtn />
        </div>
      </div>
  
      {currentPlayer && (
        <div className="f justify-end align-c gap-s">
          <span
            className="f-center avatar font-size-m weight-500"
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
