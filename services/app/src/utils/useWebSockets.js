/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState, useContext } from 'react';
import { WsContext } from '../contexts/ws-context';

export const useWebSockets = () => {
  const [players, setPlayers] = useState([]);
  const [turns, setTurns] = useState([]);
  const [movedBy, setMovedBy] = useState([]);
  const [myTurn, setMyTurn] = useState(null);
  const [playerDeleted, setPlayerDeleted] = useState(null);
  const { ws } = useContext(WsContext);

  const websocketReducer = (type, payload) => {
    switch (type) {
      case 'UpdatePlayerList':
        return setPlayers(payload);
      case 'PlayerDisconnected' :
        return setPlayers(payload);
      case 'NewBoardState':
        return setTurns(payload);
      case 'FigureMoved':
        return setMovedBy(payload);
      case 'ClearBoard':
        return setMovedBy([]);
      case 'SetMyTurn':
        return setMyTurn(payload);
      case 'MoveSkipped':
        return setPlayers(payload);
      case 'RemovePlayer':
        return setPlayerDeleted(payload);
      default:
        return null;
    }
  };

  useEffect(() => {
    if (ws) {
      ws.addEventListener('message', (event) => {
        const { type, payload } = JSON.parse(event.data);
        websocketReducer(type, payload);
      });
    }
  }, [ws]);

  return { players, turns, movedBy, myTurn, playerDeleted };
};
