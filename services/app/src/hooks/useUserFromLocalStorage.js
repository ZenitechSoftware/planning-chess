import { useState, useEffect } from 'react';

export const useUserFromLocalStorage = () => {
  const isUserInLocalStorage = !!localStorage.getItem('user');
  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(isUserInLocalStorage);
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setAuth(true);
    }
  });
  return { nameAuthentication: auth, username: user };
};
