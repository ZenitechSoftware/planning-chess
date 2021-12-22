import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';

const Room = () => {
  const [roomUrl, _setRoomUrl] = useState(window.location.href);

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button>Copy link</button>
      </CopyToClipboard>
      <ChessBoard numberOfCells={6} numberOfRows={6} />
    </div>
  );
};

export default Room;
