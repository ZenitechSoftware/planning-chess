import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from 'pages/game/Game';

const Content = () => {
  return (
    <Routes>
      <Route path="/game/:id" element={<Game />} />
    </Routes>
  );
};

export default Content;
