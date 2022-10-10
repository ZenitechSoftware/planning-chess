import React from 'react';
import { Navigate } from 'react-router';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const { gameId } = useGameId();
  return <Navigate to={`/game/${gameId}`} />
};

export default HomePage;
