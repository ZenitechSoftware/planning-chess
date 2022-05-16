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
import GameFooter from '../../components/gameFooter/GameFooter';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import {
  buildMoveSkippedEventMessage,
  buildPlayerConnectedEventMessage,
  buildRemovePlayerEventMessage,
} from '../../api/playerApi';
import { ChessBoardContext } from '../../contexts/ChessBoardContext';
import Header from '../../components/header/Header';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();

  const { players, movedBy, playerDeleted } = useWebSockets();
  const { ws } = useContext(WsContext);
  const { finishMove, clearBoard, finished, score, canPlay } =
    useContext(ChessBoardContext);

  useEffect(() => {
    if (username && ws) {
      ws.send(buildPlayerConnectedEventMessage(username));
    }
  }, [username]);

  const findUserByUsername = (userName) =>
    players.find((element) => element.name === userName);

  const currentPlayer = useMemo(
    () => players.find((user) => user.name === username),
    [players],
  );

  const team = useMemo(
    () =>
      players
        .filter((user) => user.id !== findUserByUsername(username).id)
        .map((player) =>
          movedBy.includes(player.name)
            ? { ...player, name: `${player.name} (finished move)` }
            : player,
        ),
    [players, currentPlayer, movedBy],
  );

  useEffect(() => {
    if (playerDeleted && playerDeleted === currentPlayer.id) {
      localStorage.removeItem('user');
      window.location.replace('/');
    }
  }, [playerDeleted]);

  const skipMove = useCallback((userId) => {
    if (userId) {
      ws.send(buildMoveSkippedEventMessage(userId));
    }
  }, []);

  const removePlayer = useCallback((userId) => {
    if (userId) {
      ws.send(buildRemovePlayerEventMessage(userId));
    }
  }, []);

  return (
    <div>
      <Header username="Mike" />
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <span>{score}</span>
      <Team
        title="Team"
        players={team}
        skipMove={skipMove}
        removePlayer={removePlayer}
      >
        <Player
          player={currentPlayer}
          skipMove={skipMove}
          removePlayer={removePlayer}
        />
      </Team>
      {!canPlay && (
        <h4>Waiting for at least one more player to join the game</h4>
      )}
      <button
        disabled={finished || !canPlay}
        type="button"
        onClick={finishMove}
      >
        submit
      </button>
      <button type="button" disabled={!canPlay} onClick={clearBoard}>
        Clear Board
      </button>
      <ChessBoard />
      <GameFooter />
    </div>
  );
}

export default Room;
