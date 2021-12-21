import React from 'react';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';

const Room = () => {
  const currentGameURL = window.location.href;

  return (
    <div>
      <h1>GAME</h1>
      <Player/>
      <span id="game-url">{currentGameURL}</span>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
