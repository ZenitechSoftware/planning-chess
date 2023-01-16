/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState, useContext } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { WsContext } from '../contexts/ws-context';

export const useWebSockets = () => {
  const userContext = useUserContext();
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isAnotherSessionActive, setIsAnotherSessionActive] = useState(false);
  const [turns, setTurns] = useState([]);
  const [movedBy, setMovedBy] = useState([]);
  const [myTurn, setMyTurn] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { ws } = useContext(WsContext);

  const websocketReducer = (type, payload) => {
    switch (type) {
      case 'PlayerAlreadyExists':
        return setIsAnotherSessionActive(true);
      case 'PlayerSuccessfullyJoined':
        userContext.setUserId(payload)
        return setCurrentPlayerId(payload);
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
      case 'ErrorMessage':
        return setErrorMessage(payload);
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

  return { players, turns, movedBy, myTurn, currentPlayerId, isAnotherSessionActive, errorMessage };
};
