import React from 'react';
import { Navigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const { gameId } = useGameId();
  const gameUrl = generatePath(ROUTES.game, { id: gameId });
  return <Navigate to={gameUrl} replace={true}/>
};

export default HomePage;
