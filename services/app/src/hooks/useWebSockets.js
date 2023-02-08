/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
import React, { useEffect, useState, useContext } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { WsContext } from '../contexts/ws-context';

const eventListeners = {}

export const useWebSockets = () => {
  const userContext = useUserContext();
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isAnotherSessionActive, setIsAnotherSessionActive] = useState(false);
  const [turns, setTurns] = useState([]);
  const [movedBy, setMovedBy] = useState([]);
  const [myTurn, setMyTurn] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { ws } = useContext(WsContext);

  const addWsEventListener = (event, callbackFn) => {
    console.log('adding event listner');
    if (eventListeners[event]) {
      eventListeners[event].push(callbackFn);
    } else {
      eventListeners[event] = [callbackFn];
    }
  };

  useEffect(() => {
    console.log("🚀 ~ useWebSockets ~ ws", ws);
  }, [ws]);

  // const websocketReducer = (type, payload) => {
  //   switch (type) {
  //     case 'PlayerAlreadyExists':
  //       return setIsAnotherSessionActive(true);
  //     case 'PlayerSuccessfullyJoined':
  //       userContext.setUserId(payload)
  //       return setCurrentPlayerId(payload);
  //     case 'UpdatePlayerList':
  //       return setPlayers(payload);
  //     case 'PlayerDisconnected' :
  //       return setPlayers(payload);
  //     case 'NewBoardState':
  //       return setTurns(payload);
  //     case 'ActionMade':
  //       return setMovedBy(payload);
  //     case 'ClearBoard':
  //       return setMovedBy([]);
  //     case 'SetMyTurn':
  //       return setMyTurn(payload);
  //     case 'MoveSkipped':
  //       return setPlayers(payload);
  //     case 'ErrorMessage':
  //       return setErrorMessage(payload);
  //     default:
  //       return null;
  //   }
  // };

  const wsEventHandler = React.useCallback((event) => {
    const { type, payload } = JSON.parse(event.data);
    const eventHandlers = eventListeners[type];
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(payload))
    }
  }, []);

  useEffect(() => {
    if (ws) {
      ws?.addEventListener('message', wsEventHandler);
    }
  }, [ws]);

  return { players, turns, movedBy, myTurn, currentPlayerId, isAnotherSessionActive, errorMessage, addWsEventListener };
};
