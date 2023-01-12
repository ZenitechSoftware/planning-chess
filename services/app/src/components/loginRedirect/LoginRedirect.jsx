import React from 'react';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '../../pages/routes'; 
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import { useGameId } from '../../hooks/useGameId';
import { useUserRole } from '../../hooks/useUserRole';

const LoginRedirect = () => {
  const { pathname } = useLocation();

  const gameRoomId = matchPath('/game/:id', pathname ) ? pathname.split('/')[2] : undefined
  useGameId(gameRoomId);

  const { nameAuthentication } = useUserFromLocalStorage();
  const { role } = useUserRole();

  if (!nameAuthentication) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (nameAuthentication && !role) {
    return <Navigate to={ROUTES.roleSelection} replace />
  }

  return <Outlet replace />;
};

export default LoginRedirect;
