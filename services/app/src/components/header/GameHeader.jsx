import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './header.css';
import Separator from "../../static/svg/SolidSeparator.svg";
import CopyBtn from './CopyBtn';
import CreateNewRoomBtn from './CreateNewRoomBtn';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import GameHeaderDropDown from '../gameHeaderDropDown/GameHeaderDropDown';

const GameHeader = ({ openAvatarModal, onCreateRoom }) => {
  const { currentPlayer } = useChessBoardContext();

  return (
    <Header>
      <div 
        className='f-1 align-c gap-m header-info'
      >
        <img src={Separator} alt="separator" />
        <div className='f-1 justify-between'>
          <CopyBtn />
          <CreateNewRoomBtn onCreateRoom={onCreateRoom} />
        </div>
      </div>

      {currentPlayer && (
        <div>
          <GameHeaderDropDown openAvatarModal={openAvatarModal} />
        </div>
      )}
    </Header>
    
  );
};

GameHeader.propTypes = {
  openAvatarModal: PropTypes.func.isRequired,
  onCreateRoom: PropTypes.func.isRequired,
};

export default GameHeader;
