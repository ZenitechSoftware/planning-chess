import React from 'react';
import { Navigate } from 'react-router';
import LoginForm from '../../components/loginPage/LoginForm';
import { ROUTES } from '../routes';
import { useUserContext } from '../../contexts/UserContext'; 
import DarkLayout from '../../components/pageLayout/DarkLayout';

const LoginPage = () => {
  const userContext = useUserContext();
  
  return userContext.username ? (
    <Navigate to={ROUTES.roleSelection} replace />
  ) : (
    <DarkLayout>
      <LoginForm />
    </DarkLayout>
  )
}

export default LoginPage;