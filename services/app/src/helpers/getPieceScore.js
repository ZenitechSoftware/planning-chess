export const getPieceScore = (figure) => {
  const pieceScores = {
    pawn: 1,
    knight: 2,
    bishop: 3,
    rook: 5,
    king: 8,
    queen: 13,
  };
  return pieceScores[figure];
};
