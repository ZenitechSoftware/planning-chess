/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { wsDebugMessages } from '../utils/wsDebugMessages';
import { DEBUG } from '../env';
import wsWrapper from '../helpers/wsWrapper';
import { PING_INTERVAL_DURATION } from '../constants/appConstants';
import { buildPingMessage } from '../api/appApi';
import { ROUTES } from '../pages/routes';

export const WsContext = createContext('');

// TODO what if server is running on different port?
const host = process.env.NODE_ENV === 'development' ? 'localhost:8083' : window.location.host;

const WebSocketsContextProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const navigate = useNavigate();

  const openWsConnection = ({ onConnect, gameId }) => {
    const WebSockets = wsWrapper(WebSocket);
    const url = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${host}/api/${gameId}`;
    const webSocket = new WebSockets(url);

    webSocket.addEventListener('open', () => {
      setWs(webSocket);
      if (DEBUG) {
        wsDebugMessages(webSocket);
      };
      onConnect(webSocket);
    });
  
    webSocket.addEventListener('error', () => {
      navigate(ROUTES.error)
    })
  };

  useEffect(() => {
    const pingInterval = setInterval(() => {
      ws?.send(buildPingMessage());
    }, PING_INTERVAL_DURATION);

    return () => {
      clearInterval(pingInterval);
    }
  }, [ws]);

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

WebSocketsContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default WebSocketsContextProvider;