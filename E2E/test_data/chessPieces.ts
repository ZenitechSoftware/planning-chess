export enum ChessPiece {
    pawn = 'pawn',
    knight = 'knight',
    bishop = 'bishop',
    rook = 'rook',
    king = 'king',
    queen = 'queen',
  }
  
  export const ChessPieceValue: Record<ChessPiece, string> = {
    [ChessPiece.pawn]: '1SP',
    [ChessPiece.knight]: '2SP',
    [ChessPiece.bishop]: '3SP',
    [ChessPiece.rook]: '5SP',
    [ChessPiece.king]: '8SP',
    [ChessPiece.queen]: '13SP'
  }