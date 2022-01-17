import express from 'express';
import * as path from 'path';
import app from './app';
import WebSocket, { WebSocketServer } from 'ws';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

const server = app.listen(process.env.APP_PORT || 8081);

const wss = new WebSocketServer({
  noServer: true,
});

const players = new Map<string, WebSocket>();

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws, request) => {
    wss.emit('connection', ws, request);

    ws.once('message', function message(data, isBinary) {
      const newUser = data.toString();
      players.set(newUser, ws);
      ws.on('close', () => {
        players.delete(newUser);
        const allPlayers = Array.from(players.keys());
        for (const connection of players.values()) {
          if (connection.readyState === 1) {
            connection.send(JSON.stringify(allPlayers), { binary: isBinary });
          }
        }
      });
      const allPlayers = Array.from(players.keys());
      for (const connection of players.values()) {
        if (connection.readyState === 1) {
          connection.send(JSON.stringify(allPlayers), { binary: isBinary });
        }
      }
    });
  });
});
