import React, { useEffect, useState } from 'react';

export const useWebSockets = (endpoint) => {
    const url = `ws://localhost:8081${endpoint}`;
    const ws = new WebSocket(url);
    const [users, setUsers] = useState([])

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
          const newUser = event.data
          console.log(event.data)
          setUsers(newUser)
        }
      )
    }, [])
    
    return [ws, users];
  }