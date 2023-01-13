import React from 'react';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '../../pages/routes'; 
import { useGameId } from '../../hooks/useGameId';
import { useUserRole } from '../../hooks/useUserRole';
import { useUserContext } from '../../contexts/UserContext';

export const EnsureRole = () => {
  const { role } = useUserRole();

  if (!role) {
    return <Navigate to={ROUTES.roleSelection} replace />
  }

  return <Outlet replace />;
}

export const EnsureUsername = () => {
  const userContext = useUserContext();
  const { pathname } = useLocation();
  const gameRoomId = matchPath('/game/:id', pathname ) ? pathname.split('/')[2] : undefined;
  useGameId(gameRoomId);

  if (!userContext.user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet replace />;
};
