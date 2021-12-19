import React from 'react';
import ChessBoard from '../../components/gameBoard/ChessBoard';

const Room = () => {
  const currentGameURL = window.location.href;

  return (
    <div>
      <h1>GAME</h1>
        <a id="game-url">{currentGameURL}</a>
        <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
