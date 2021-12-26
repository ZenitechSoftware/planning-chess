import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import '../../static/style/game.css';

function Room() {
  const [roomUrl] = useState(window.location.href);
  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <div id="userName">
        <Player name={localStorage.getItem('user')} />
      </div>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
    </div>
  );
}

export default Room;
