import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './header.css';
import Separator from "../../static/svg/SolidSeparator.svg";
import CopyBtn from './CopyBtn';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import GameHeaderDropDown from '../gameHeaderDropDown/GameHeaderDropDown';

const GameHeader = ({ openAvatarModal }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <Header>
      <div 
        className='f-row align-c gap-m header-info'
      >
        <img src={Separator} alt="separator" />
        <CopyBtn />
      </div>

      {currentPlayer && (
        <div className='f-1 justify-end align-c gap-s'>
          <GameHeaderDropDown openAvatarModal={openAvatarModal} />
        </div>
      )}
    </Header>
    
  );
};

GameHeader.propTypes = {
  openAvatarModal: PropTypes.func.isRequired,
};

export default GameHeader;
