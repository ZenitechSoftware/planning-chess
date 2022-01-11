/* eslint-disable no-console */
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';
import { useWebSockets } from '../../utils/useWebSockets'

function Room() {
  const [roomUrl] = useState(window.location.href);
  const username = localStorage.getItem('user') 
  const [wsConnection, users] = useWebSockets('/api/ws-game');

  const handleSubmit = () => {
      wsConnection.send(username);
  };

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player name={username} />
      <div>
        <h2>Team</h2>
        <div>
          {users.map((user) => user !== username && user)}
        </div>
      </div>
      <button type="submit" onClick={() => handleSubmit()}>
        submit
      </button>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
    </div>
  );
}

export default Room;
