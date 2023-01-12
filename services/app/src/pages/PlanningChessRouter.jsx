import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './game/Game';
import { ROUTES } from './routes';
import LoginRedirect from '../components/loginRedirect/LoginRedirect';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import UserTakenPage from './userTakenPage/UserTakenPage';
import RoleSelectionPage from './roleSelectionPage/RoleSelectionPage';

const PlanningChessRouter = () => (
  <Routes>
    <Route element={<LoginRedirect />}>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route exact path={ROUTES.game} element={<Game />} />
    </Route>
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.roleSelection} element={<RoleSelectionPage />} />
    <Route path={ROUTES.userTaken} element={<UserTakenPage />} />
  </Routes>
);

export default PlanningChessRouter;
