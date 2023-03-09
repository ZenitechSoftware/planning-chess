import React from 'react';
import Button from '../button/Button';
import RefreshIcon from '../../static/svg/RefreshIcon.svg';
import { useUserContext } from '../../contexts/UserContext';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';

const CreateNewRoomBtn = () => {
  const userContext = useUserContext();

  const getNewGameUrl = () => {
    const newGameId = userContext.generateGameId();
    const gamePath = buildPathFromTemplate(ROUTES.game, {id: newGameId});
    return `${window.location.origin}${gamePath}`
  }

  return (
    <Button
      className='margin-r-m'
      dataTestid='header-create-new-room-btn'
    >
      <a
        href={getNewGameUrl()}
        className='f-center gap-xs'
      >
        <img src={RefreshIcon} alt='create new room icon' className='chessboard-icon' />
        Create new room
      </a>
    </Button>
  );
};

export default CreateNewRoomBtn;
