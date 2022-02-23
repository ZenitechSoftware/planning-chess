import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from '../../pages/game/Game';
import LoginRoute from "../nameRoute/LoginRoute";
import LoginPage from "../../pages/login/LoginPage";

function Content() {
  return (
    <Routes>
      <LoginRoute path="/game/:id" element={<Game />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default Content;
