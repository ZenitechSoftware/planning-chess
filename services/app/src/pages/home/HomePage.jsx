import React from 'react';
import { Navigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const { gameId } = useGameId();
  const gameUrl = generatePath(ROUTES.game, { id: gameId });
  history.replaceState(null, 'Planning Chess', [ gameUrl  ] )
  return <Navigate to={gameUrl} />
};

export default HomePage;
