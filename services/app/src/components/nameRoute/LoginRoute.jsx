import React from 'react';
import {Navigate} from "react-router";
import {Route} from "react-router-dom";
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';

const LoginRoute = (routeProps) => {
  const { authentication } = useUserFromLocalStorage();
  if (authentication) {
    return <Route {...routeProps} />;
  }

  return <Navigate to="/login" />
}

export default LoginRoute;
