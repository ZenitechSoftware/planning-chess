export enum ChessPiece {
    pawn = 'pawn',
    knight = 'knight',
    bishop = 'bishop',
    rook = 'rook',
    king = 'king',
    queen = 'queen',
  }
  
  export const ChessPieceValue: Record<ChessPiece, number> = {
    [ChessPiece.pawn]: 1,
    [ChessPiece.knight]: 2,
    [ChessPiece.bishop]: 3,
    [ChessPiece.rook]: 5,
    [ChessPiece.king]: 8,
    [ChessPiece.queen]: 13
  }

  export const ChessBoardNumbersValue = {
    1 : 1,
    2 : 2,
    3 : 3,
    4 : 5,
    5 : 8,
    6 : 13
 }
 
 export const ChessBoardLettersValue = {
    a : 1,
    b : 2,
    c : 3,
    d : 5,
    e : 8,
    f : 13
 }