import React, { useState, useEffect } from 'react';
import Outlet from 'react-router-dom';

const NameRoute = () => {

  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFormLocalStorage = localStorage.getItem('user');
    if (userFormLocalStorage) {
      const foundUser = JSON.parse(userFormLocalStorage);
      setUser(foundUser);
    }
  }, [user]);

  if (user !== null) {
    setAuth(true);
  }

  return auth ? 'todo let user to the game if user exists in local storage, firstly try to use Outlet' : 'todo custom prompt element if user doesnt exist';
};

export default NameRoute;
