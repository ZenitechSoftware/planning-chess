import React, {
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../routes';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../hooks/useWebSockets';
import GameFooter from '../../components/gameFooter/GameFooter';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { useUserId } from '../../hooks/useUserId';
import { WsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import {
  buildMoveSkippedEventMessage,
  buildPlayerConnectedEventMessage,
  buildRemovePlayerEventMessage,
} from '../../api/playerApi';
import GameHeader from '../../components/header/GameHeader';
import '../../static/style/game.css';

const Game = () => {
  const { username } = useUserFromLocalStorage();
  const { userId, setUserId } = useUserId();

  const { players, movedBy, playerDeleted, currentPlayerId, isAnotherSessionActive } = useWebSockets();
  const { ws } = useContext(WsContext);
  
  useEffect(() => {
    setTimeout(() => {
      if (username && ws) {
        ws.send(buildPlayerConnectedEventMessage(username, userId));
      }
    })
  }, [username, ws]);

  useEffect(() => {
    if(currentPlayerId) {
      setUserId(currentPlayerId);
    }
  }, [currentPlayerId]);

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

  const skipMove = useCallback((playerId) => {
    if (playerId) {
      ws.send(buildMoveSkippedEventMessage(playerId));
    }
  }, [ws]);

  const skipCurrentPlayerMove = useCallback(() => {
    skipMove(currentPlayer?.id);
  }, [skipMove, currentPlayer]);

  const removePlayer = useCallback((playerId) => {
    if (playerId) {
      ws.send(buildRemovePlayerEventMessage(playerId));
    }
  }, []);

  return (
    <div>
      {isAnotherSessionActive && <Navigate to={ROUTES.userTaken} />}
      <GameHeader />
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

export default Game;
