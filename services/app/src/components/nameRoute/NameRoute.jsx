import React, { useState, useEffect } from 'react';

const NameRoute = () => {

  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const foundUser = JSON.parse(userLocalStorage);
      setUser(foundUser);
    }
  }, []);

  if (user !== null) {
    setAuth(true);
  }

  return auth ? 'todo nothing is user doesnt exist' : 'todo custom pop up element if user doesnt exist';
};

export default NameRoute;
