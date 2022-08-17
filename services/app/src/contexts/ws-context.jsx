/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, createContext } from 'react';
import wsWrapper from '../helpers/wsWrapper';

export const WsContext = createContext('');

// eslint-disable-next-line react/prop-types
const WebSocketsContextProvider = ({ children }) => {
  const url = `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${
    window.location.host
  }/api/ws-game`;
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const WebSockets = wsWrapper(WebSocket);
    const webSocket = new WebSockets(url);

    webSocket.addEventListener('open', () => {
      console.log('opened');
      setWs(webSocket);
    });

    webSocket.addEventListener('message', (event) => {
      console.log('message: ', event.data);
    });

    webSocket.addEventListener('close', () => {
      console.log('closed');
    });

    webSocket.addEventListener('error', (err) => {
      console.log('connection failed');
      console.error(err);
    });
  }, []);

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
