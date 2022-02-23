import { useCallback } from "react";

export const useGameId = () => {
  const saveGameId = useCallback((id) => {
    window.localStorage.setItem('lastGameId', id);
  }, []);

  const getGameId = () => localStorage.getItem('lastGameId');

  return {getGameId, saveGameId};
};
