import express from 'express';
import { defaultErrorHandler, NotFoundError, wrap } from '../errors';
import gameRouter from './game';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'hi' });
});

router.get(
  '/error-async',
  wrap(async () => {
    throw new Error('Something unexpected');
  }),
);

router.get(
  '/error-async-404',
  wrap(async () => {
    throw new NotFoundError();
  }),
);

router.use('/game', gameRouter);

router.use(defaultErrorHandler);

export default router;
