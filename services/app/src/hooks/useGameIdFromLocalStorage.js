export const useGameIdFromLocalStorage = () => {
  const gameIdFromLocalStorage = localStorage.getItem('lastGameId');

  return gameIdFromLocalStorage;
};
