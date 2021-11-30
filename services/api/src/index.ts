import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.APP_PORT || 8081);
