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
import { ROUTES, buildPathFromTemplate } from '../pages/routes';

export const WsContext = createContext('');

const eventListeners = {}

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

  const createNewRoom = (onCreateNewRoom, gameId) => {
    ws?.close();
    navigate(
      buildPathFromTemplate(ROUTES.game, {id: gameId}),
      { replace: true }
    );
    onCreateNewRoom();
  }

  const addWsEventListener = (event, callbackFn) => {
    if (eventListeners.event) {
      eventListeners[event].push(callbackFn);
    } else {
      eventListeners[event] = [callbackFn];
    }
  };

  const wsEventHandler = (event) => {
    const { type, payload } = JSON.parse(event.data);

    if (eventListeners[type]) {
      eventListeners[type].forEach(handler => handler(payload))
    }
  };

  useEffect(() => {
    const pingInterval = setInterval(() => {
      ws?.send(buildPingMessage());
    }, PING_INTERVAL_DURATION);

    return () => {
      clearInterval(pingInterval);
    }
  }, [ws]);

  useEffect(() => {
    if (ws) {
      ws?.addEventListener('message', wsEventHandler);
    }
  }, [ws]);

  return (
    <WsContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        ws,
        addWsEventListener,
        openWsConnection,
        createNewRoom,
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