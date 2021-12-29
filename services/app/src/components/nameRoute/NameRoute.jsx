import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import WindowPrompt from '../prompt/WindowPrompt';

const NameRoute = () => {
  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setAuth(true);
    }
  }, [user]);

  return auth ? <Outlet /> : <WindowPrompt />;
};

export default NameRoute;
