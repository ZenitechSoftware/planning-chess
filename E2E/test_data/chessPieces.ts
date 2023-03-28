export enum ChessPiece {
  pawn = "pawn",
  knight = "knight",
  bishop = "bishop",
  rook = "rook",
  king = "king",
  queen = "queen",
}

export const ChessPieceValue: Record<ChessPiece, number> = {
  [ChessPiece.pawn]: 1,
  [ChessPiece.knight]: 2,
  [ChessPiece.bishop]: 3,
  [ChessPiece.rook]: 5,
  [ChessPiece.king]: 8,
  [ChessPiece.queen]: 13,
};
