import express from 'express';
import Joi from 'joi';
import { config } from 'dotenv';

const router = express.Router();

config();

const validationOfPath = () => {
  const uuidPath = `${process.env.GAME_ROOM_UUID}`;
  return Joi.string().valid(uuidPath);
};

router.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/:id', async (req, res) => {
  const passedUUID = req.params.id;
  const pathValidationSchema = validationOfPath();

  await pathValidationSchema
    .validateAsync(passedUUID)
    .then(() => res.status(200).send({ message: 'Validation Successful' }))
    .catch(() => res.status(400).send({ message: 'Validation Error' }));
});

export default router;
