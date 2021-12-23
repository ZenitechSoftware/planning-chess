import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from '../../pages/game/Game';

function Content() {
  return (
    <Routes>
      <Route path="/game/:id" element={<Game />} />
    </Routes>
  );
}

export default Content;
