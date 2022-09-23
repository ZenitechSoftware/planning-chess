import React from 'react';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import {useGameId} from "../../hooks/useGameId";

const LoginRoute = () => {
  const { pathname } = useLocation();
  const { saveGameId } = useGameId()

  if (matchPath('/game/:id', pathname )) {
    const gameRoomId = pathname.split('/')[2];
    saveGameId(gameRoomId);
  }

  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
