import React from 'react';
import {Navigate} from "react-router";
import { useGameId } from '../../hooks/useGameId';

const HomePage = () => {
  const { getGameId } = useGameId();
  return <Navigate to={`/game/${getGameId()}`} />
};

export default HomePage;
