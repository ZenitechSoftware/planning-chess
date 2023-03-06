import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';
import { ROOM_ID_LENGTH } from '../../constants/appConstants';
import Button from '../button/Button';
import RefreshIcon from '../../static/svg/RefreshIcon.svg';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';
import { useWsContext } from '../../contexts/ws-context';

const CreateNewRoomBtn = ({ jumpToNewRoom }) => {
  const navigate = useNavigate();
  const { ws } = useWsContext();

  const createNewRoom = () => {
    ws?.close();
    const newRoomId = nanoid(ROOM_ID_LENGTH);
    navigate(
      buildPathFromTemplate(ROUTES.game, {id: newRoomId}),
      { replace: true }
    );
    
    jumpToNewRoom(newRoomId);
  }

  return (
    <Button
      className='margin-r-m'
      dataTestid='header-create-new-room-btn'
      clickHandler={createNewRoom}
    >
      <img src={RefreshIcon} alt='create new room icon' className='chessboard-icon' />
      Create new room
    </Button>
  );
};

CreateNewRoomBtn.propTypes = {
  jumpToNewRoom: PropTypes.func.isRequired,
};

export default CreateNewRoomBtn;
