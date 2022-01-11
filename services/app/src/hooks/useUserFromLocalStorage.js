import { useState, useEffect } from 'react';

export const useUserFromLocalStorage = () => {
  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setAuth(true);
    } else {
      const person = prompt('Please enter your name');
      window.localStorage.setItem('user', person);
      setUser(userFromLocalStorage);
      setAuth(true);
    }
  }, []);
  return { authentication: auth, username: user };
};
