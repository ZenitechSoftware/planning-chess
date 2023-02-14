import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Dropdown, Space } from 'antd';
import DropdownArrowUp from '../../static/svg/DropdownArrowUp.svg';
import DropdownArrowDown from '../../static/svg/DropDownArrowDown.svg';
import './dropdown.css'

const GameHeaderDropDown = ({ openAvatarDialog }) => {
  const [imgSrc, setImgSrc] = useState(DropdownArrowDown);

  const rotateArrow = (open) => {
    if (open) {
      setImgSrc(DropdownArrowUp);
      return;
    }
    setImgSrc(DropdownArrowDown);
  }

  const items = [
    {
      label: <button type='button' onClick={openAvatarDialog}>Change profile picture</button>,
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
    >
      <Space>
        <img src={imgSrc} alt="dropdown icon" />
      </Space>
    </Dropdown>
  )
};

GameHeaderDropDown.propTypes = {
  openAvatarDialog: PropTypes.func.isRequired,
};

export default GameHeaderDropDown;
