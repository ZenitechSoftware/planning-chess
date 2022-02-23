import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGameId } from '../../hooks/useGameId';

function HomePage() {
  const navigate = useNavigate();

  const gameId = useGameId().getGameId();

  useEffect(() => {
    if(gameId) navigate(`/game/${gameId}`);
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default HomePage;
