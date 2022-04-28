/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useMemo, createContext } from 'react';
import wsWrapper from '../helpers/wsWrapper';

export const WsContext = createContext('');

// eslint-disable-next-line react/prop-types
const WebSocketsContextProvider = ({ children }) => {
  const url = `${process.env.REACT_APP_WS_CONNECTION}${process.env.REACT_APP_WS_ENDPOINT}`;
  const ws = useMemo(() => {
    const WebSockets = wsWrapper(WebSocket);
    return new WebSockets(url);
  }, [url]);

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('opened');
    });

    ws.addEventListener('message', (event) => {
      console.log('message: ', event.data);
    });

    ws.addEventListener('close', () => {
      console.log('closed');
    });

    ws.addEventListener('error', (err) => {
      console.log('connection failed');
      console.error(err);
    });
  }, [ws]);

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
