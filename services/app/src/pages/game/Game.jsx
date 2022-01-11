import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import Player from '../../components/player/Player';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';

function Room() {
  const [roomUrl] = useState(window.location.href);
  const { username } = useUserFromLocalStorage();
  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player name={username} />
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
      <ChessBoardPieces />
    </div>
  );
}

export default Room;
