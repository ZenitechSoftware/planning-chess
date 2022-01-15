import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import ChessBoardPieces from '../../components/chessBoard/ChessBoardPieces';
import Player from '../../components/player/Player';
import { useUserFromLocalStorage } from '../../hooks/useUserFromLocalStorage';
import ChessGameProvider from '../../contexts/ChessBoardContext';

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
      <ChessGameProvider>
        <ChessBoard />
        <ChessBoardPieces />
      </ChessGameProvider>
    </div>
  );
}

export default Room;
