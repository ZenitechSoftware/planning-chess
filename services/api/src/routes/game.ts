import express from 'express';
import { validate as validateUUID } from 'uuid';

const router = express.Router();

router.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.get('*', async (req, res) => {
  const uuidString = req.path.replace('/', '');
  if (validateUUID(uuidString)) {
    res.json({ test: true });
  } else {
    res.json({ test: false });
  }
});

export default router;
