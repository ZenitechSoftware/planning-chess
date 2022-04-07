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
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();
  const { users, movedBy } = useWebSockets();
  const { ws } = useContext(WsContext);
  const { finishMove, clearBoard, finished, score } =
    useContext(ChessBoardContext);

  useEffect(() => {
    if (username && ws) {
      ws.send(buildPlayerConnectedEventMessage(username));
    }
  }, [username]);

  const findUserByUsername = (userName) =>
    users.find((element) => element.name === userName);

  const currentUser = useMemo(
    () => users.find((user) => user.name === username),
    [users],
  );

  const team = useMemo(
    () =>
      users
        .filter((user) => user.id !== findUserByUsername(username).id)
        .map((player) =>
          movedBy.includes(player.name)
            ? { ...player, name: `${player.name} (finished move)` }
            : player,
        ),
    [users, currentUser, movedBy],
  );

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
      <Player score={score} user={currentUser} skipMove={skipMove} />
      <Team title="Team" users={team} skipMove={skipMove} />
      <button disabled={finished} type="button" onClick={finishMove}>
        submit
      </button>
      <button type="button" onClick={clearBoard}>
        Clear Board
      </button>
      <ChessBoard />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
