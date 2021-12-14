import React from 'react';

const Room = () => {
  const gameURL = window.location.href;

  return (
    <div>
      <h1 id="game">GAME</h1>
      <a id="game-url">{gameURL}</a>
    </div>
  );
};

export default Room;
