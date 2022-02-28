import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const navigate = useNavigate();

  const { getGameId } = useGameId();
  const gameId = getGameId();

  useEffect(() => {
    if (gameId) navigate(`/game/${gameId}`);
  });

  return <div>HomePage</div>;
};

export default HomePage;
