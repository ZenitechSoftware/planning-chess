/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, createContext, useContext } from 'react';
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
  const [ws, setWs] = useState(null);

  const openWsConnection = ({ onConnect, roomId }) => {
    const WebSockets = wsWrapper(WebSocket);
    const url = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${host}/api/${roomId}`;
    const webSocket = new WebSockets(url);

    webSocket.addEventListener('open', () => {
      setWs(webSocket);
      if (DEBUG) {
        wsDebugMessages(webSocket);
      };
      onConnect(webSocket);
    });
  };

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
      openWsConnection();
    }
  }

  return (
    <WsContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        ws,
        openWsConnection,
      }}
    >
      {children}
    </WsContext.Provider>
  );
};

export const useWsContext = () => useContext(WsContext);

export default WebSocketsContextProvider;