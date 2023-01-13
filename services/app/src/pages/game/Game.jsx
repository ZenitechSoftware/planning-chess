import React, {
  useEffect,
  useCallback,
} from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../routes';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import { useWebSockets } from '../../hooks/useWebSockets';
import GameFooter from '../../components/gameFooter/GameFooter';
import { useWsContext } from '../../contexts/ws-context';
import Team from '../../components/team/Team';
import {
  buildMoveSkippedEventMessage,
  buildPlayerConnectedEventMessage,
} from '../../api/playerApi';
import GameHeader from '../../components/header/GameHeader';
import '../../static/style/game.css';
import { useChessBoardContext } from '../../contexts/ChessBoardContext';
import { useUserContext } from '../../contexts/UserContext';

const Game = () => {
  const { user, userId, role, gameId } = useUserContext();

  const { playerDeleted, currentPlayerId, isAnotherSessionActive } = useWebSockets();
  const { ws, openWsConnection } = useWsContext();
  const { currentPlayer } = useChessBoardContext();
  
  useEffect(() => {
    openWsConnection({
      roomId: gameId,
      onConnect: (websocket) => {
        websocket.send(buildPlayerConnectedEventMessage(user, userId, role));
      }
    });
  }, []);

  // TODO: most likely will be moved to usercontext
  useEffect(() => {
    if (playerDeleted && playerDeleted === currentPlayerId) {
      localStorage.removeItem('user');
      window.location.replace('/');
    }
  }, [playerDeleted]);

  const skipMove = useCallback((playerId) => {
    if (playerId) {
      ws?.send(buildMoveSkippedEventMessage(playerId));
    }
  }, [ws]);

  const skipCurrentPlayerMove = useCallback(() => {
    skipMove(currentPlayer?.id);
  }, [skipMove, currentPlayer]);

  return (
    <div>
      {isAnotherSessionActive && <Navigate to={ROUTES.userTaken} />}
      <GameHeader />
      <div className="game-content">
        <Team skipMove={skipMove} />
        <ChessBoard />
      </div>
      <GameFooter
        skipCurrentPlayerMove={skipCurrentPlayerMove}
      />
    </div>
  );
}

export default Game;
