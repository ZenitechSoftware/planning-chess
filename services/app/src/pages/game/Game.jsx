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
import wsReadyStates from '../../constants/wsReadyStates';
import '../../components/gameFooter/game-footer.css';

const Game = () => {
  const { username, userId, role, gameId } = useUserContext();
  const { isAnotherSessionActive } = useWebSockets();
  const { ws, openWsConnection } = useWsContext();
  const { currentPlayer, lastTurn, removeFigureFromBoard } = useChessBoardContext();

  window.onfocus = () => {
    if(ws?.readyState === wsReadyStates.CLOSED) {
      openWsConnection({
        gameId,
        onConnect: (websocket) => {
          websocket.send(buildPlayerConnectedEventMessage(username, userId, role));
      }});
    }
  }

  useEffect(() => {
    openWsConnection({
      gameId,
      onConnect: (websocket) => {
        websocket.send(buildPlayerConnectedEventMessage(username, userId, role));
      }
    });
  }, [gameId]);

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
