import React from 'react';
import { Navigate } from 'react-router';
import '../../static/style/loginScreen.css'
import Header from '../../components/loginPage/Header'
import LoginForm from '../../components/loginPage/LoginForm'
import WebFooter from '../../components/webFooter/WebFooter'

const LoginPage = () => {
  const authentication = localStorage.getItem('user');
  const navigateUrl = '/game/test';

  return authentication ? (
    <Navigate to={navigateUrl} />
  ) : (
    <div className="login-screen">
      <Header />
      <LoginForm />
      <WebFooter />
    </div>
  )
}

export default LoginPage