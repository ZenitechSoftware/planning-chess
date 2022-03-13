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
  }, [auth]);
  return { authentication: auth, username: user };
};
