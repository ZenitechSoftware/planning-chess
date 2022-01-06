import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ChessBoard from '../../components/chessBoard/ChessBoard';
import Player from '../../components/player/Player';

function useWebSockets(endpoint) {
  const url = `ws://localhost:8081${endpoint}`;
  const ws = new WebSocket(url);
  ws.addEventListener('open', () => {
    console.log('opened');
    ws.send('ping');
  });

  ws.addEventListener('close', () => {
    console.log('closed');
  });

  ws.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
  });

  ws.addEventListener('error', (err) => {
    console.log('connection failed');
    console.error(err);
  });
  return ws;
}

function Room() {
  const [roomUrl] = useState(window.location.href);
  const wsConnection = useWebSockets('/api/ws-game');

  React.useEffect(() => {
    setTimeout(() => {
      console.log(wsConnection.readyState);
    }, 3000);
    console.log(wsConnection);
  }, [wsConnection]);

  const handleSubmit = () => {
      wsConnection.send('hello');
  };

  return (
    <div>
      <h1>GAME</h1>
      <span id="game-url">{roomUrl}</span>
      <CopyToClipboard text={roomUrl}>
        <button type="button">Copy link</button>
      </CopyToClipboard>
      <Player name={localStorage.getItem('user')} />
      <button type="submit" onClick={() => handleSubmit()}>
        submit
      </button>
      <ChessBoard numberOfColumns={6} numberOfRows={6} />
    </div>
  );
}

export default Room;
