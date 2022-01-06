import express from 'express';
import express_ws from 'express-ws';
import Joi from 'joi';

const router = express.Router();
const expressWs = express_ws(express());


const validationOfPath = () => {
  const uuidPath = '671e2367-86c3-453a-9df8-3c0048145b64';
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

router.ws('/a/name', (ws, req) => {

  ws.on('message', (msg) => {
    console.log(msg);
  });
  console.log('socket', req.params);
});

export default router;
