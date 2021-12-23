import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from 'pages/game/Game';
import NameRoute from '../nameRoute/NameRoute';

const Content = () => {
  return (
    <Routes>
      <Route element={<NameRoute/>}>
        <Route path="/game/:id" element={<Game />} />
      </Route>
    </Routes>
  );
};

export default Content;
