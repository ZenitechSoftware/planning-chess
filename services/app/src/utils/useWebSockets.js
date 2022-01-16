/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState, useMemo } from 'react';

export const useWebSockets = (endpoint) => {
  const url = `ws://localhost:8081${endpoint}`;
  const [users, setUsers] = useState([]);
  const ws = useMemo(() => new WebSocket(url), [url]);

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('opened');
    });

    ws.addEventListener('close', () => {
      console.log('closed');
    });

    ws.addEventListener('error', (err) => {
      console.log('connection failed');
      console.error(err);
    });

    ws.addEventListener('message', (event) => {
      const newUser = event.data;
      setUsers(JSON.parse(newUser));
    });
  }, [ws]);

  return [ws, users];
};
