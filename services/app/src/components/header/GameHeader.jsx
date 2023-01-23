import React from 'react';
import Header from './Header';
import { rgbToColor } from '../../helpers/rgbToColor';
import './header.css';
import Separator from "../../static/svg/SolidSeparator.svg";
import CopyBtn from './CopyBtn';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';

const GameHeader = () => {
  const { currentPlayer } = useChessBoardContext();

  const avatarLetter = currentPlayer?.name[0];

  return (
    <Header>
      <div 
        className='f-row align-c gap-m header-info'
      >
        <img src={Separator} alt="separator" />
        <CopyBtn />
      </div>
  
      {currentPlayer && (
        <div className="f-1 justify-end align-c gap-s">
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
