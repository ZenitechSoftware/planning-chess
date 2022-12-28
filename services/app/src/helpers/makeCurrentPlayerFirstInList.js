export const makeCurrentPlayerFirstInList = (arr, currentPlayerId, currentPlayer) => {
  const tempList = [...arr].filter(p => p.id !== currentPlayerId);
  tempList.splice(0,0, currentPlayer);

  return tempList;
}