import React from 'react';
import { Navigate } from 'react-router';
import '../../static/style/loginScreen.css';
import '../../static/style/layout.css';
import DefaultHeader from '../../components/header/DefaultHeader';
import LoginForm from '../../components/loginPage/LoginForm';
import Footer from '../../components/pageFooter/Footer';
import { useGameId } from '../../hooks/useGameId';
import * as paths from "../../constants/urls";

const LoginPage = () => {
  const authentication = localStorage.getItem('user');

  const { gameId } = useGameId();
  return authentication ? (
    <Navigate to={paths.gameRoomUrl(gameId)} />
  ) : (
    <div className="login-screen f-column-between">
      <DefaultHeader />
      <LoginForm />
      <Footer />
    </div>
  )
}

export default LoginPage;