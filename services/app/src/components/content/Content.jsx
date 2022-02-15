import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from '../../pages/game/Game';
import HomePage from '../../pages/home/HomePage';
import NameRoute from '../nameRoute/NameRoute';

function Content() {

  return (
    <Routes>
      <Route element={<NameRoute />}>
        <Route path='/' element={<HomePage />} />
        <Route path="/game/:id" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default Content;
