import express from 'express';
import Joi from 'joi';

const router = express.Router();

router.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/:id', async (req, res) => {
  const passedUUID = req.params.id;
  const uuidPath = '671e2367-86c3-453a-9df8-3c0048145b64';

  const pathValidationSchema = Joi.string().valid(uuidPath);

  await pathValidationSchema
    .validateAsync(passedUUID)
    .then(() => res.status(200).send({ message: 'Validation Successful' }))
    .catch(() => res.status(400).send({ message: 'Validation Error' }));
});

export default router;
