import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as path from 'path';
import app from './app';

app.use(express.static(path.join(__dirname, '/../../../app/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../../../app/dist/index.html'));
});

app.listen(process.env.APP_PORT || 8081);
