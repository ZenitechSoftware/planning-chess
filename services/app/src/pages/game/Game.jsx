import React, { useState, useContext, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../utils/useWebSockets';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();
  const { users, movedBy } = useWebSockets();
  const { ws } = useContext(WsContext);
  const { finishMove, clearBoard } = useContext(ChessBoardContext);

  useEffect(() => {
    if (username) {
      ws.onconnect = () =>
        ws.send(
          JSON.stringify({
            type: 'PlayerConnected',
            payload: { playerName: username },
          }),
        );
    }
  }, [username]);

  const findUserByUsername = (userName) =>
    users.find((element) => element.name === userName);

  const team = users
    .filter((user) => user.id !== findUserByUsername(username).id)
    .map((player) =>
      movedBy.includes(player.name)
        ? `${player.name} (finished move)`
        : player.name,
    );

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
        <div>{team}</div>
      </div>
      <button type="submit" onClick={finishMove}>
        submit
      </button>
      <button type="submit" onClick={clearBoard}>
        Clear Board
      </button>
      <ChessBoard />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
