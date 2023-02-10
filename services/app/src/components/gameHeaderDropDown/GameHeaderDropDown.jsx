import React from 'react'
import PropTypes from 'prop-types';
import { Dropdown, Space } from 'antd';
import DropdownArrow from '../../static/svg/DropdownArrowUp.svg';
import './dropdown.css'

const GameHeaderDropDown = ({ openAvatarDialog }) => {
  const items = [
    {
      label: <button type='button' onClick={openAvatarDialog}>Change profile picture</button>,
      key: 0,
    },
    // {
    //   label: <p>Change username</p>,
    //   key: 1,
    // },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} className='dropdown-icon padding-s' overlayClassName='dropdown-buttons'>
      <Space>
        <img src={DropdownArrow} alt="dropdown icon" />
      </Space>
    </Dropdown>
  )
};

GameHeaderDropDown.defaultProps = {
  openAvatarDialog: null,
}

GameHeaderDropDown.propTypes = {
  openAvatarDialog: PropTypes.func,
};

export default GameHeaderDropDown;