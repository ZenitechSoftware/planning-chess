import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

const ROOM_ID_LENGTH = 8;

export const useGameId = (roomId) => {
  const generateGameId = () => nanoid(ROOM_ID_LENGTH);
  const initialGameIdValue = () => {
    if (roomId) {
      localStorage.setItem('lastGameId', roomId);
      return roomId;
    }

    const storedId = localStorage.getItem('lastGameId');
    if (storedId) return storedId;

    const newGameId = generateGameId();
    localStorage.setItem('lastGameId', newGameId);
    return newGameId;
  }
  const [gameId, _setGameId] = useState(initialGameIdValue());

  const setGameId = useCallback((id) => {
    window.localStorage.setItem('lastGameId', id);
    _setGameId(id);
  }, []);

  return { gameId, setGameId, generateGameId };
};
