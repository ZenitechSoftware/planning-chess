import React, {
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../routes';
import ChessBoard from '../../components/chessBoard/ChessBoard';
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
import { ChessBoardContext } from '../../contexts/ChessBoardContext';

const Game = () => {
  const { username } = useUserFromLocalStorage();
  const { userId, setUserId } = useUserId();

  const { playerDeleted, currentPlayerId, isAnotherSessionActive } = useWebSockets();
  const { ws } = useContext(WsContext);
  const { currentPlayer } = useContext(ChessBoardContext);

  const role = Math.floor(Math.random() * 2) + 1 === 1 ? 'Voter' : 'Spectator';
  useEffect(() => {
    setTimeout(() => {
      if (username && ws) {
        ws.send(buildPlayerConnectedEventMessage(username, userId, role));
      }
    })
  }, [username, ws]);

  useEffect(() => {
    if(currentPlayerId) {
      setUserId(currentPlayerId);
    }
  }, [currentPlayerId]);

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
          skipMove={skipMove}
          removePlayer={removePlayer}
        />
        <ChessBoard />
      </div>
      <GameFooter
        skipCurrentPlayerMove={skipCurrentPlayerMove}
      />
    </div>
  );
}

export default Game;
