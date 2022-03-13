import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGameId } from '../../hooks/useGameId';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../utils/useWebSockets';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();

  const { id } = useParams();
  const { saveGameId } = useGameId();

  useEffect(() => {
    saveGameId(id);
  }, []);

  const { users } = useWebSockets();
  const { ws } = useContext(WsContext);

    useEffect(() => {
        if (username) {
            ws.onOpen = () => {
                ws.send(
                    JSON.stringify({
                        type: 'PlayerConnected',
                        payload: { playerName: username },
                    }),
                );
            };
        }
    }, [username]);

  const findUserByUsername = (userName) =>
    users.find((element) => element.name === userName);

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player name={username} />
      <div>
        <h2>Team</h2>
        <div>
          {users.map(
            (user) => user.id !== findUserByUsername(username).id && user.name,
          )}
        </div>
      </div>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
