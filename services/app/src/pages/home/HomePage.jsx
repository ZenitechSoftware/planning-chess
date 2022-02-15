import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGameIdFromLocalStorage } from '../../hooks/useGameIdFromLocalStorage';

function HomePage() {
  const navigate = useNavigate();

  const gameId = useGameIdFromLocalStorage();

  useEffect(() => {
    if(gameId) navigate(`/game/${gameId}`);
  })

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default HomePage;
