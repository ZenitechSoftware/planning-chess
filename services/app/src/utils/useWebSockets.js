/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState, useContext } from 'react';
import { WsContext } from '../contexts/ws-context';

export const useWebSockets = () => {
  const [users, setUsers] = useState([]);
  const { ws } = useContext(WsContext);

  useEffect(() => {
    if (ws !== undefined) {
      ws.addEventListener('message', (event) => {
        const newUser = event.data;
        setUsers(JSON.parse(newUser));
      });
    }
  }, [ws]);

  return { users };
};
