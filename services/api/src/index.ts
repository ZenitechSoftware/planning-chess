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

// const users = [];

// const addUser = ({ id, name, room }) => {
//   name = name.trim().toLowerCase();
//   room = room.trim().toLowerCase();

//   const existingUser = users.find(
//     (user) => user.room === room && user.name === name,
//   );

//   if (!name || !room) return { error: 'Username and room are required.' };
//   if (existingUser) return { error: 'Username is taken.' };

//   const user = { id, name, room };

//   users.push(user);

//   return { user };
// };

// const getUser = (id) => users.find((user) => user.id === id);
// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (client, request) => {
    // client.addEventListener('close', () => {
    //   console.log('client closed');
    // });

    // const { err, user } = addUser({ id: socket.id });
    wss.emit('connection', client, request);
    client.addListener('message', (data) => {
      client.send(data.toString());
    });
  });
});
