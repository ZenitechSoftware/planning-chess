import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../hooks/useWebSockets';
import GameFooter from '../../components/gameFooter/GameFooter';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { WsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import {
  buildMoveSkippedEventMessage,
  buildPlayerConnectedEventMessage,
  buildRemovePlayerEventMessage,
} from '../../api/playerApi';
import Header from '../../components/header/Header';
import '../../static/style/game.css';
// import { openWsConnection } from '../../helpers/openWsConnection';

const Room = () => {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();

  const { players, movedBy, playerDeleted, currentPlayerId } = useWebSockets();
  const { ws } = useContext(WsContext);

  useEffect(() => {
    setTimeout(() => {
      if (username && ws) {
        ws.send(buildPlayerConnectedEventMessage(username));
      }
    })
  }, [username, ws]);

  const currentPlayer = useMemo(
    () => players.find((user) => user.id === currentPlayerId),
    [players],
  );

  const team = useMemo(
    () =>
      players
        .filter((user) => user.id !== currentPlayerId)
        .map((player) =>
          movedBy.includes(player.name)
            ? { ...player, name: `${player.name} (finished move)` }
            : player,
        ),
    [players, currentPlayer, movedBy],
  );

  useEffect(() => {
    if (playerDeleted && playerDeleted === currentPlayerId) {
      localStorage.removeItem('user');
      window.location.replace('/');
    }
  }, [playerDeleted]);

  const skipMove = useCallback((userId) => {
    if (userId) {
      ws.send(buildMoveSkippedEventMessage(userId));
    }
  }, [ws]);

  const skipCurrentPlayerMove = useCallback(() => {
    skipMove(currentPlayer?.id);
  }, [skipMove, currentPlayer]);

  const removePlayer = useCallback((userId) => {
    if (userId) {
      ws.send(buildRemovePlayerEventMessage(userId));
    }
  }, []);

  return (
    <div>
      <Header player={currentPlayer} roomUrl={roomUrl} />
      <div className="game-content">
        <Team
          playerCount={players.length}
          players={team}
          skipMove={skipMove}
          removePlayer={removePlayer}
        >
          <Player
            player={currentPlayer}
          />
        </Team>
        <ChessBoard />
      </div>
      <GameFooter
        skipCurrentPlayerMove={skipCurrentPlayerMove}
      />
    </div>
  );
}

export default Room;
