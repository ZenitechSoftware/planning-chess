import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Room from '../../pages/game/Game';
import NameRoute from '../nameRoute/NameRoute';

function Content() {
  return (
    <Routes>
      <Route element={<NameRoute />}>
        <Route path="/game/:id" element={<Room />} />
      </Route>
    </Routes>
  );
}

export default Content;
