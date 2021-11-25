import express from 'express';

const router = express.Router();

router.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/test', async (_req, res) => {
  res.json({ test: true });
});

export default router;
