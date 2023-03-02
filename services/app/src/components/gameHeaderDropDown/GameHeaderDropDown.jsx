import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Dropdown, Space } from 'antd';
import DropdownArrowUp from '../../static/svg/DropdownArrowUp.svg';
import DropdownArrowDown from '../../static/svg/DropDownArrowDown.svg';
import GameHeaderNameContainer from '../header/GameHeaderNameContainer';
import './dropdown.css';

const GameHeaderDropDown = ({ openAvatarModal }) => {
  const [imgSrc, setImgSrc] = useState(DropdownArrowDown);

  const rotateArrow = (open) => {
    if (open) {
      setImgSrc(DropdownArrowUp);
      return;
    }
    setImgSrc(DropdownArrowDown);
  }

  const onOpenAvatarModal = () => {
    setImgSrc(DropdownArrowDown);
    openAvatarModal();
  }

  const items = [
    {
      label: 'Change profile picture',
      onClick: onOpenAvatarModal,
      key: 0,
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      trigger={['click']} 
      className='dropdown-icon padding-s' 
      overlayClassName='dropdown-buttons'
      onOpenChange={rotateArrow}
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
  openAvatarModal: PropTypes.func.isRequired,
};

export default GameHeaderDropDown;
