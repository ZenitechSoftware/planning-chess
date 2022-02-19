import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../utils/useWebSockets';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import wsReadyStates from '../../constants/wsReadyStates';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();
  const { users } = useWebSockets();
  const { ws } = useContext(WsContext);

  useEffect(() => {
    if (username) {
      ws.send(
        JSON.stringify({
          type: 'PlayerConnected',
          payload: { playerName: username },
        }),
      );
    }
  }, [username]);

  const handleSubmit = () => {
    ws.send(
      JSON.stringify({
        type: 'PlayerConnected',
        payload: { playerName: username },
      }),
    );
  };

  const skipMove = (userId) => {
    if (userId && ws.readyState === wsReadyStates.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'MoveSkipped',
          payload: { userId },
        }),
      );
    }
  };

  const findUserByUsername = (userName) =>
    users.find((element) => element.name === userName);

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player user={findUserByUsername(username)} skipMove={skipMove} />
      <Team
        title="Team"
        users={users.filter(
          (user) => user.id !== findUserByUsername(username).id && user.name,
        )}
        skipMove={skipMove}
      />
      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
