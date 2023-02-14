import React, { useEffect, useMemo, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, matchPath } from 'react-router';
import { nanoid } from 'nanoid';
import { ROUTES } from '../pages/routes';

const ROOM_ID_LENGTH = 8;

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const generateGameId = () => nanoid(ROOM_ID_LENGTH);
  const { pathname } = useLocation();
  const urlGameId = matchPath(ROUTES.game, pathname )?.params.id;

  const [username, setUsername] = useState(localStorage.getItem('user'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [gameId, setGameId] = useState(urlGameId || localStorage.getItem('lastGameId') || generateGameId());
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar'));

  useEffect(() => {
    if (username) {
      localStorage.setItem('user', username);
    }
  }, [username]);

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
    if(urlGameId) {
      localStorage.setItem('lastGameId', gameId);
      setGameId(urlGameId)
    }
  }, [urlGameId]);

  useEffect(() => {
    if (userAvatar) {
      localStorage.setItem('userAvatar', userAvatar);
    }
  }, [userAvatar])

  const value = useMemo(() => ({
    username,
    role: userRole,
    userId,
    setUsername,
    setUserId,
    setRole: setUserRole,
    gameId,
    setGameId,
    userAvatar,
    setUserAvatar,
  }), [username, userRole, userId, userAvatar]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
);
};
 
export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default UserContextProvider;