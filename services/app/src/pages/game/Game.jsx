import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
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
import '../../static/style/game.css';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();

  const { players, movedBy, playerDeleted } = useWebSockets();
  const { ws } = useContext(WsContext);
  const { 
    finishMove,
    clearBoard,
    finished,
    score,
    canPlay
  } = useContext(ChessBoardContext);

  useEffect(() => {
    setTimeout(() => {
      if (username && ws) {
        ws.send(buildPlayerConnectedEventMessage(username));
      }
    })
  }, [username]);

  const findUserByUsername = (userName) =>
    players.find((element) => element.name === userName);

  const currentPlayer = useMemo(
    () => players.find((user) => user.name === username),
    [players],
  );

  console.log(currentPlayer);

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
      <Header username={localStorage.getItem('user')} roomUrl={roomUrl} />
      <span>{score}</span>
      <button disabled={finished || !canPlay} type="button" onClick={finishMove}>
        submit
      </button>
      <button type="button" disabled={!canPlay} onClick={clearBoard}>
        Clear Board
      </button>
      <div className="game-content">
        <Team
          playerCount={players.length}
          players={team}
          skipMove={skipMove}
          removePlayer={removePlayer}
        >
          <Player
            player={currentPlayer}
            skipMove={skipMove}
          />
        </Team>
        <ChessBoard />
      </div>
      <GameFooter />
    </div>
  );
}

export default Room;
