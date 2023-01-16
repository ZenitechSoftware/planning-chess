/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { nanoid } from 'nanoid';

const ROOM_ID_LENGTH = 8;

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const generateGameId = () => nanoid(ROOM_ID_LENGTH);
  const { pathname } = useLocation();
  const roomId = pathname.split('/')[2];

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [gameId, setGameId] = useState(roomId || localStorage.getItem('lastGameId') || generateGameId());


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  useEffect(() => {
    if(roomId) {
      localStorage.setItem('lastGameId', gameId);
      setGameId(roomId)
    }
  }, [pathname, gameId]);

  const value = useMemo(() => ({
    user,
    role: userRole,
    userId,
    setUser,
    setUserId,
    setRole: setUserRole,
    gameId,
    setGameId,
  }), [user, userRole, userId]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
);
};
 
export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;