enum ChessPieceName {
  pawn = "pawn",
  knight = "knight",
  bishop = "bishop",
  rook = "rook",
  king = "king",
  queen = "queen",
}
export class ChessPiece {
  name: ChessPieceName;
  value: number;
  constructor(name: ChessPieceName, value: number) {
    this.name = name;
    this.value = value;
  }
}
export const ChessPieces = {
  pawn: new ChessPiece(ChessPieceName.pawn, 1),
  knight: new ChessPiece(ChessPieceName.knight, 2),
  bishop: new ChessPiece(ChessPieceName.bishop, 3),
  rook: new ChessPiece(ChessPieceName.rook, 5),
  king: new ChessPiece(ChessPieceName.king, 8),
  queen: new ChessPiece(ChessPieceName.queen, 13),
};
