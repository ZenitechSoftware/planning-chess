import React from 'react';

const Room = () => {
  const currentGameURL = window.location.href;

  return (
    <div>
      <h1 id="game">GAME</h1>
      <a id="game-url">{currentGameURL}</a>
    </div>
  );
};

export default Room;
