import React from 'react';
import { Navigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../routes';
import '../../static/style/loginScreen.css';
import Header from '../../components/header/Header';
import LoginForm from '../../components/loginPage/LoginForm';
import Footer from '../../components/pageFooter/Footer';
import { useGameId } from '../../hooks/useGameId';
import * as paths from "../../constants/urls";

const LoginPage = () => {
  const authentication = localStorage.getItem('user');

  const { gameId } = useGameId();
  const gameUrl = generatePath(ROUTES.game, { id: gameId });
  history.replaceState(null, 'Planning Chess', [ gameUrl  ]);
  
  return authentication ? (
    <Navigate to={paths.gameRoomUrl(gameId)} />
  ) : (
    <div className="login-screen f-column-between">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  )
}

export default LoginPage;