import React from 'react';
import { Outlet } from 'react-router';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import LoginPage from "../../pages/login/LoginPage";

const LoginRoute = () => {
  const { authentication } = useUserFromLocalStorage();
  return authentication ? <Outlet /> : <LoginPage />;
};

export default LoginRoute;
