import React from 'react';

const ChessBoardPieces = () => {

  const pieces = ['pawn', 'knight', 'bishop', 'rook', 'king', 'queen'];
    
  return (
    <div id="chess-game-pieces">
      { pieces.map((figure) => (
        <p className={figure+'-piece'} key={figure}>{figure}</p>
      ))}
    </div>  
  );
};

export default ChessBoardPieces;
