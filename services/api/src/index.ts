import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as path from 'path';
import app from './app';
import { WebSocketServer } from 'ws';
import * as playersService from './messaging/players.service';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

const server = app.listen(process.env.PORT || 8081);

const wss = new WebSocketServer({
  noServer: true,
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws, request) => {
    wss.emit('connection', ws, request);
    ws.on('message', (data) => {
      playersService.newMessageReceived(ws, JSON.parse(data.toString()));
      ws.on('close', () => {
        playersService.unsubscribe(ws);
        playersService.playerDisconnected();
      });
    });
  });
});
