import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from '../../pages/routes';
import { useUserContext } from '../../contexts/UserContext';

export const EnsureRole = () => {
  const userContext = useUserContext();

  if (!userContext.role) {
    return <Navigate to={ROUTES.roleSelection} replace />
  }

  return <Outlet replace />;
}

export const EnsureUsername = () => {
  const userContext = useUserContext();

  if (!userContext.username) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet replace />;
};
