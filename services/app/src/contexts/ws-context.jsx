/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router';
import wsWrapper from '../helpers/wsWrapper';
import {useUserFromLocalStorage} from "../hooks/useUserFromLocalStorage";
import { wsDebugMessages } from '../utils/wsDebugMessages';
import { DEBUG } from '../env';
import { PingIntervalDuration } from '../constants/pingTime';
import { buildPingMessage } from '../api/appApi';

export const WsContext = createContext('');

// TODO what if server is running on different port?
const host = process.env.NODE_ENV === 'development' ? 'localhost:8081' : window.location.host;

// eslint-disable-next-line react/prop-types
const WebSocketsContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const { authentication } = useUserFromLocalStorage();
  const roomIdUrl = pathname.split('/')[2];
  const [roomId, setRoomId] = useState(roomIdUrl);

  useEffect(() => {setRoomId(roomIdUrl)}, [pathname]);

  const url = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${host}/api/${roomId}`;
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (!roomId) {
      console.log(`No room id provided`);
      return;
    }

    if (!authentication) {
      console.log(`User not logged in.`);
      return;
    }

    const WebSockets = wsWrapper(WebSocket);
    const webSocket = new WebSockets(url);

    webSocket.addEventListener('open', () => {
      setWs(webSocket);
    });

    if (DEBUG) {
      wsDebugMessages(webSocket)
    };
  }, [roomId]);

  useEffect(() => {
    let pingInterval;
    if(ws) {
      pingInterval = setInterval(() => {
        
        ws.send(buildPingMessage());
      }, PingIntervalDuration);
    }

    return () => {
      clearInterval(pingInterval);
    }
  }, [ws])

  return (
    <WsContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        ws,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export default WebSocketsContextProvider;
