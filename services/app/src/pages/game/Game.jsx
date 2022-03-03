import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../utils/useWebSockets';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import {
  buildMoveSkippedEventMessage,
  buildPlayerConnectedEventMessage,
} from '../../api/playerApi';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();
  const { users } = useWebSockets();
  const currentUser = useMemo(
    () => users.find((user) => user.name === username),
    [users],
  );
  const team = useMemo(
    () => users.filter((user) => user.id !== currentUser.id),
    [users, currentUser],
  );
  const { ws } = useContext(WsContext);

  useEffect(() => {
    if (username) {
      ws.send(buildPlayerConnectedEventMessage(username));
    }
  }, [username]);

  const handleSubmit = () => {
    ws.send(buildPlayerConnectedEventMessage(username));
  };

  const skipMove = useCallback((userId) => {
    if (userId) {
      ws.send(buildMoveSkippedEventMessage(userId));
    }
  }, []);

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player user={currentUser} skipMove={skipMove} />
      <Team title="Team" users={team} skipMove={skipMove} />
      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
