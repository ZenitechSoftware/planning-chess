import React from 'react';
import ChessBoard from '../../components/gameBoard/ChessBoard';

const Room = () => {
  return (
    <div>
      <h1>GAME</h1>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
