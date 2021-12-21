import React from 'react';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';

const Room = () => {
  const currentGameURL = window.location.href;

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{currentGameURL}</span>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
      <ChessBoardPieces />
    </div>
  );
};

export default Room;
