import { useCallback } from 'react';
import { nanoid } from 'nanoid';

const ROOM_ID_LENGTH = 8;

export const useGameId = () => {
  const saveGameId = useCallback((id) => {
    window.localStorage.setItem('lastGameId', id);
  }, []);

  const generateGameId = () => nanoid(ROOM_ID_LENGTH);

  const getGameId = () => {
    const gameId = localStorage.getItem('lastGameId');
    if (!gameId) {
      const id = generateGameId();
      saveGameId(id);
      return id;
    }
    return gameId;
  };

  return { getGameId, saveGameId, generateGameId };
};
