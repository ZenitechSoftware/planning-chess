import React from 'react';
import { Navigate } from 'react-router';
import '../../static/style/loginScreen.css';
import Header from '../../components/header/Header';
import LoginForm from '../../components/loginPage/LoginForm';
import Footer from '../../components/pageFooter/Footer';
import { ROUTES } from '../routes';
import { useUserContext } from '../../contexts/UserContext'; 

const LoginPage = () => {
  const userContext = useUserContext();
  
  return userContext.username ? (
    <Navigate to={ROUTES.roleSelection} replace />
  ) : (
    <div className="login-screen f-column-between">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  )
}

export default LoginPage;