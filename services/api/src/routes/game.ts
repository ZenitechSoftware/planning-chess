import express from 'express';
import Joi from 'joi';

const router = express.Router();

router.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/:id', async (req, res) => {
  const pathUUID = req.params.id;
  const uuidValidationSchema = Joi.string().guid({
    version: 'uuidv4',
    separator: '-',
  });
  const authResult = uuidValidationSchema.validate(pathUUID);
  !authResult.error ? res.json({ test: true }) : res.json({ test: false });
});

export default router;
