import React from 'react';
import { Navigate } from 'react-router';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useUserContext } from '../../contexts/UserContext';

const HomePage = () => {
  const { gameId } = useUserContext();
  const gameUrl = generatePath(ROUTES.game, { id: gameId });

  return <Navigate to={gameUrl} replace />
};

export default HomePage;
