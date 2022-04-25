import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoFunction } from '@planning-chess/shared';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  demoFunction();
  const navigate = useNavigate();

  const { getGameId } = useGameId();
  const gameId = getGameId();

  useEffect(() => {
    if (gameId) navigate(`/game/${gameId}`);
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
