import React from 'react';
import { Navigate } from 'react-router';
import '../../static/style/loginScreen.css'
import '../../static/style/layout.css'
import Header from '../../components/loginPage/Header'
import LoginForm from '../../components/loginPage/LoginForm'
import Footer from '../../components/pageFooter/Footer'
import { gameRoomUrl } from '../../constants/urls';

const LoginPage = () => {
  const authentication = localStorage.getItem('user');
  const navigateUrl = gameRoomUrl;

  return authentication ? (
    <Navigate to={navigateUrl} />
  ) : (
    <div className="login-screen f-column-between">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  )
}

export default LoginPage