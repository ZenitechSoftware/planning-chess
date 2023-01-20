import React from 'react';
import { Navigate } from 'react-router';
import LoginForm from '../../components/loginPage/LoginForm';
import { ROUTES } from '../routes';
import { useUserContext } from '../../contexts/UserContext'; 
import Layout from '../../components/pageLayout/Layout';

const LoginPage = () => {
  const userContext = useUserContext();
  
  return userContext.username ? (
    <Navigate to={ROUTES.roleSelection} replace />
  ) : (
    <Layout className='page-layout-dark'>
      <LoginForm />
    </Layout>
  )
}

export default LoginPage;