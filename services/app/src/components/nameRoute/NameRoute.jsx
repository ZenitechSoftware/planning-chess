import React, { useState, useEffect } from 'react';

const NameRoute = () => {

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (user) {
      const foundUser = JSON.parse(user);
      setUser(foundUser);
    }
  }, [user]);

  if (user !== null) {
    setAuth(true);
  }

  return auth ? 'todo nothing is user doesnt exist' : 'todo custom pop up element if user doesnt exist';
};

export default NameRoute;
