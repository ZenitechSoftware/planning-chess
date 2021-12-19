import React from 'react';
import ChessBoard from '../../components/chessBoard/ChessBoard';

const Room = () => {
  const currentGameURL = window.location.href;

  const copyGameURL = async () => {
    try {
      const url =
        window.location.host + '/game/671e2367-86c3-453a-9df8-3c0048145b64';
      await navigator.clipboard.writeText(url);
      alert(`Link Copied To: \n ${url}`);
    } catch (err) {
      new Error(err);
    }
  };

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">
        <a onClick={() => copyGameURL()}>{currentGameURL}</a>
      </span>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
