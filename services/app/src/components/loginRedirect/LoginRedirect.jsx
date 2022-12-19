import React from 'react';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '../../pages/routes'; 
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { useGameId } from '../../hooks/useGameId';

const LoginRedirect = () => {
  const { pathname } = useLocation();

  const gameRoomId = matchPath('/game/:id', pathname ) ? pathname.split('/')[2] : undefined
  useGameId(gameRoomId);

  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <Navigate to={ROUTES.login} />;
};

export default LoginRedirect;
