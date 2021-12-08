import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../privateRoute/PrivateRoute';
import Game from 'pages/game/Game';
import Home from 'pages/home/Home';

const Content = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/game/*" element={<Game />} />
        </Route>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Fragment>
  );
};

export default Content;
