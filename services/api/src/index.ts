import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as path from 'path';
import app from './app';
import { WebSocketServer } from 'ws';
import * as playersService from './messaging/players.service';
// import logger from './logger';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

const server = app.listen(process.env.PORT || 8081);

const wss = new WebSocketServer({
  noServer: true,
});

const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    ws.ping();
  });
}, 10000);

wss.on('close', () => {
  clearInterval(interval);
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws, request) => {
    wss.emit('connection', ws, request);
    // ws.on('pong', () => logger.info(`Pong  ${ws}`));
    ws.on('message', (data) => {
      playersService.newMessageReceived(ws, JSON.parse(data.toString()));
      ws.on('close', () => {
        playersService.unsubscribe(ws);
        playersService.playerDisconnected();
      });
    });
  });
});
