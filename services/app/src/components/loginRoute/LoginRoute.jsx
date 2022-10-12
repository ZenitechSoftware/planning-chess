import React from 'react';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { useGameId } from '../../hooks/useGameId';

const LoginRoute = () => {
  const { pathname } = useLocation();

  const gameRoomId = matchPath('/game/:id', pathname ) ? pathname.split('/')[2] : undefined
  useGameId(gameRoomId);

  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
