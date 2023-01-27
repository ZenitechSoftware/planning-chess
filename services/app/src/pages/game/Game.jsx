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
import '../../components/gameFooter/game-footer.css';
import wsReadyStates from '../../constants/wsReadyStates';

const Game = () => {
  const { username, userId, role, gameId } = useUserContext();
  const { isAnotherSessionActive } = useWebSockets();
  const { ws, openWsConnection } = useWsContext();
  const { currentPlayer, lastTurn, removeFigureFromBoard } = useChessBoardContext();

  const connectToWs = useCallback(() => {
    openWsConnection({
      gameId,
      onConnect: (websocket) => {
        websocket.send(buildPlayerConnectedEventMessage(username, userId, role));
      }
    });
  }, [gameId, username, role, userId]);

  window.onfocus = () => {
    if(ws?.readyState === wsReadyStates.CLOSED) {
      connectToWs();
    }
  }

  useEffect(() => {
    connectToWs();
  }, [connectToWs]);

  const skipMove = useCallback((playerId) => {
    if (playerId) {
      ws?.send(buildMoveSkippedEventMessage(playerId));
    }
  }, [ws]);

  const skipCurrentPlayerMove = useCallback(() => {
    if (lastTurn) {
      removeFigureFromBoard();
    }

    skipMove(currentPlayer?.id);
  }, [skipMove, currentPlayer, lastTurn]);

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
