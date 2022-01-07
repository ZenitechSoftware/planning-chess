/* eslint-disable no-console */
import express from 'express';
import * as path from 'path';
import app from './app';
import { WebSocketServer } from 'ws';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

const server = app.listen(process.env.APP_PORT || 8081);

const wss = new WebSocketServer({
  noServer: true,
});

const users: Array<string> = [];
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws, request) => {

    wss.emit('connection', ws, request);

    ws.on('message', function message(data, isBinary) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          console.log(users);
          const newUser = data.toString();
          if (users.includes(newUser)) {
            client.send('Please select another name', { binary: isBinary });
          } else {
            users.push(newUser);
            client.send(JSON.stringify(users), { binary: isBinary });
          }
        }
      });
    });
  });
});
