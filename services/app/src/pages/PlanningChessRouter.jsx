import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './game/Game';
import { ROUTES } from './routes';
import LoginRedirect from '../components/loginRedirect/LoginRedirect';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import UserTakenPage from './userTakenPage/UserTakenPage';

const PlanningChessRouter = () => (
  <Routes>
    <Route element={<LoginRedirect />}>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route exact path={ROUTES.game} element={<Game />} />
      <Route path={ROUTES.userTaken} element={<UserTakenPage />} />
    </Route>
    <Route path={ROUTES.login} element={<LoginPage />} />
  </Routes>
);

export default PlanningChessRouter;
