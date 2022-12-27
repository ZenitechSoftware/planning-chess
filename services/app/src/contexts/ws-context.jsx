/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, createContext } from 'react';
import { useLocation } from 'react-router';
import {useUserFromLocalStorage} from "../hooks/useUserFromLocalStorage";
import { wsDebugMessages } from '../utils/wsDebugMessages';
import { DEBUG } from '../env';
import wsWrapper from '../helpers/wsWrapper';
import { PING_INTERVAL_DURATION } from '../constants/appConstants';
import { buildPingMessage } from '../api/appApi';
import wsReadyStates from '../constants/wsReadyStates';

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

  const openWsConnection = ({ onOpen }) => {
    const WebSockets = wsWrapper(WebSocket);
    const webSocket = new WebSockets(url);

    webSocket.addEventListener('open', () => {
      onOpen(webSocket);
    });
  };

  useEffect(() => {
    if (!roomId) {
      console.log(`No room id provided`);
      return;
    }

    if (!authentication) {
      console.log(`User not logged in.`);
      return;
    }

    openWsConnection({
      onOpen: (wsConnection) => {
        setWs(wsConnection);
        if (DEBUG) {
          wsDebugMessages(wsConnection);
        };
      }
    });

  }, [roomId]);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      ws?.send(buildPingMessage());
    }, PING_INTERVAL_DURATION);

    return () => {
      clearInterval(pingInterval);
    }
  }, [ws])

  window.onfocus = () => {
    if(ws?.readyState === wsReadyStates.CLOSED) {
      openWsConnection({
        onOpen: (wsConnection) => {
          setWs(wsConnection);
        },
      });
    }
  }

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
