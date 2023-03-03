import React from 'react';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';
import { ROOM_ID_LENGTH } from '../../constants/appConstants';
import Button from '../button/Button';
import RefreshIcon from '../../static/svg/RefreshIcon.svg';
import { buildPathFromTemplate, ROUTES } from '../../pages/routes';
import { useUserContext } from '../../contexts/UserContext';
import { useWsContext } from '../../contexts/ws-context';
import { buildPlayerConnectedEventMessage } from '../../api/playerApi';

const CreateNewRoomBtn = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const { ws, openWsConnection } = useWsContext();

  const createNewRoom = () => {
    ws.close();
    const newRoomId = nanoid(ROOM_ID_LENGTH);
    navigate(
      buildPathFromTemplate(ROUTES.game, {id: newRoomId}),
      { replace: true }
    );
    
    openWsConnection({
      gameId: newRoomId,
      onConnect: (websocket) => {
        websocket.send(buildPlayerConnectedEventMessage(
          userContext.username, 
          userContext.userId, 
          userContext.userRole,
        ));
      },
    })
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

export default CreateNewRoomBtn;
