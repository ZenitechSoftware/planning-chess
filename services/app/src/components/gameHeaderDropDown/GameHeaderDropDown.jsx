import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { Dropdown, Space } from 'antd';
import DropdownArrowUp from '../../static/svg/DropdownArrowUp.svg';
import DropdownArrowDown from '../../static/svg/DropDownArrowDown.svg';
import GameHeaderNameContainer from '../header/GameHeaderNameContainer';
import './dropdown.css';
import { useUserContext } from '../../contexts/UserContext';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';

const GameHeaderDropDown = ({ openAvatarModal }) => {
  const userContext = useUserContext();

  const [imgSrc, setImgSrc] = useState(DropdownArrowDown);

  const newGameUrl = useMemo(() => {
    const newGameId = userContext.generateGameId();
    const gamePath = buildPathFromTemplate(ROUTES.game, {id: newGameId});
    return `${window.location.origin}${gamePath}`
  }, []);

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
      id: 'dropdown-change-avatar',
      key: 0,
    },
    {
      label: (
        <a href={newGameUrl} className='decorate-none'>
          New room
        </a>
      ),
      id: 'dropdown-create-new-room',
      key: 1,
    }
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
