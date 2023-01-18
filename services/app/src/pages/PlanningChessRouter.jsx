import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './game/Game';
import { ROUTES } from './routes';
import { EnsureRole, EnsureUsername } from '../components/redirects/Redirects';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import UserTakenPage from './userTakenPage/UserTakenPage';
import RoleSelectionPage from './roleSelectionPage/RoleSelectionPage';
import GameNotAvailablePage from './GameNotAvailable/GameNotAvailablePage';

const PlanningChessRouter = () => (
  <Routes>
    <Route element={<EnsureUsername />}>
      <Route element={<EnsureRole />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route exact path={ROUTES.game} element={<Game />} />
        <Route path={ROUTES.userTaken} element={<UserTakenPage />} />
      </Route>
      <Route path={ROUTES.roleSelection} element={<RoleSelectionPage />} />
    </Route>
    <Route path={ROUTES.login} element={<LoginPage />} />
    <Route path={ROUTES.error} element={<GameNotAvailablePage />} />
  </Routes>
);

export default PlanningChessRouter;
