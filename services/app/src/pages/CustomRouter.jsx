import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './game/Game';
import LoginRoute from '../components/loginRoute/LoginRoute';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import UserTakenPage from './userTakenPage/UserTakenPage';

const CustomRouter = () => (
  <Routes>
    <Route element={<LoginRoute />}>
      <Route path="/" element={<HomePage />} />
      <Route exact path="/game/:id" element={<Game />} />
      <Route path="/user-taken" element={<UserTakenPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default CustomRouter;
