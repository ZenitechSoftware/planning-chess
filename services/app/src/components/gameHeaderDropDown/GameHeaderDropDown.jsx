import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Dropdown, Space } from 'antd';
import DropdownArrowUp from '../../static/svg/DropdownArrowUp.svg';
import DropdownArrowDown from '../../static/svg/DropDownArrowDown.svg';
import GameHeaderNameContainer from '../header/GameHeaderNameContainer';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import './dropdown.css'
import { PlayerRoles } from '../../constants/playerConstants';

const GameHeaderDropDown = ({ openAvatarDialog }) => {
  const [imgSrc, setImgSrc] = useState(DropdownArrowDown);

  const { currentPlayer } = useChessBoardContext();

  const rotateArrow = (open) => {
    if (open) {
      setImgSrc(DropdownArrowUp);
      return;
    }
    setImgSrc(DropdownArrowDown);
  }

  const openAvatarModule = () => {
    setImgSrc(DropdownArrowDown);
    openAvatarDialog();
  }

  const items = [
    {
      label: <button type='button' onClick={openAvatarModule}>Change profile picture</button>,
      key: 0,
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      trigger={['click']} 
      className='dropdown-icon padding-s' 
      overlayClassName='dropdown-buttons'
      id='game-header-menu-dropdown-icon'
      onOpenChange={rotateArrow}
      disabled={currentPlayer.role === PlayerRoles.Spectator}
    >
      <Space>
        <GameHeaderNameContainer
          imgSrc={imgSrc}
        />
      </Space>
    </Dropdown>
  )
};

GameHeaderDropDown.propTypes = {
  openAvatarDialog: PropTypes.func.isRequired,
};

export default GameHeaderDropDown;
