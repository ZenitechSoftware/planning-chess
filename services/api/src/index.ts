import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as path from 'path';
import app from './app';
import * as playersService from './messaging/players.service';
import * as gameRoomService from './game/game-room.service';
import { GameWebSocket } from './domain/GameRoom';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

const server = app.listen(process.env.PORT || 8081);

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `https://${req.headers.host}/`).pathname;
  const roomId = url.split('/')[2];
  const { server: wss } = gameRoomService.getOrCreateRoom(roomId);
  setTimeout(() => {
    gameRoomService.printRooms();
  }, 1000);

  wss.handleUpgrade(req, socket, head, (ws: GameWebSocket, request) => {
    wss.emit('connection', ws, request);
    ws.roomId = roomId;
    ws.on('message', (data) => {
      playersService.newMessageReceived(ws, JSON.parse(data.toString()));
    });
    ws.on('close', () => {
      playersService.unsubscribe(ws);
      playersService.playerDisconnected(ws);
      gameRoomService.cleanUp();
    });
  });
});
