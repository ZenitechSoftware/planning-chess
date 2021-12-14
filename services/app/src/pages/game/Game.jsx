import React from 'react';

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
      <h1 id="game">GAME</h1>
      <a id="game-url">{currentGameURL}</a>
      <div>
        <button id="copy-game-url-button" onClick={() => copyGameURL(gameURL)}>
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default Room;
