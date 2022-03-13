import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';

const LoginRoute = () => {
  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
