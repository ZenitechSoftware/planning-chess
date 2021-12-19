import React from 'react';
import ChessBoard from '../../components/chessBoard/ChessBoard';

const Room = () => {
  const currentGameURL = window.location.href;
  const gameURL =
    window.location.host + '/game/671e2367-86c3-453a-9df8-3c0048145b64';

  const copyGameURL = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      new Error(err);
    }
  };

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{currentGameURL}</span>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
