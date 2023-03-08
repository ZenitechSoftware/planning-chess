import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import RefreshIcon from '../../static/svg/RefreshIcon.svg';
import { useWsContext } from '../../contexts/WsContext';
import { useUserContext } from '../../contexts/UserContext';

const CreateNewRoomBtn = ({ onCreateRoom }) => {
  const { createNewRoom } = useWsContext();
  const userContext = useUserContext();

  const handleCreateNewRoom = () => {
    const newRoomId = userContext.generateGameId();

    createNewRoom(
      onCreateRoom(newRoomId),
      newRoomId,
    )
  }

  return (
    <Button
      className='margin-r-m'
      dataTestid='header-create-new-room-btn'
      clickHandler={handleCreateNewRoom}
    >
      <img src={RefreshIcon} alt='create new room icon' className='chessboard-icon' />
      Create new room
    </Button>
  );
};

CreateNewRoomBtn.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateNewRoomBtn;
