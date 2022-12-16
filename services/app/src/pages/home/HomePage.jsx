import React from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../routes';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const { gameId } = useGameId();
  return <Navigate to={`${ROUTES.game}${gameId}`} />
};

export default HomePage;
