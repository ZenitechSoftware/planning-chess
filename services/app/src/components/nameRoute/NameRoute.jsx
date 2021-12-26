import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import WindowPrompt from '../nameRoute/Prompt';

const NameRoute = () => {
  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFormLocalStorage = localStorage.getItem('user');
    if (userFormLocalStorage) {
      setUser(userFormLocalStorage);
      setAuth(true);
    }
  }, [user]);

  return auth ? <Outlet /> : <WindowPrompt />;
};

export default NameRoute;
