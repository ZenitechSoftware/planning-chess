import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from '../../pages/game/Game';
import LoginRoute from '../loginRoute/LoginRoute';
import LoginPage from '../../pages/login/LoginPage';
import HomePage from '../../pages/home/HomePage';
import UserTakenPage from '../../pages/userTakenPage/UserTakenPage';

function Content() {
  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/game/:id" element={<Game />} />
        <Route path="/user-taken" element={<UserTakenPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/user-taken" element={<UserTakenPage />} /> */}
    </Routes>
  );
}

export default Content;
