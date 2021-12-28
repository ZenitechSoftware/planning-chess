import express from 'express';
// needed to also install "npm i --save @types/express-ws", because we are using TS :D
// fall-back plan, if we can't make this work we should try to set up with "WebSocket" lib, command below
// "npm i --save @types/ws" and "npm i ws"
import express_ws from 'express-ws';
import Joi from 'joi';

const router = express.Router();
//not sure about this, this may be the problem or the "method" which calls 'router.ws'
const expressWs = express_ws(express());


// put it here for socket, not sure if we need this or need to extract more of a generic method
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

//TODO need to find a way to make this work
router.ws('/a/name', (ws, req) => {
  // const passedUUID = req.params.id;
  // const pathValidationSchema = validationOfPath().validate(passedUUID);

  ws.on('message', (msg) => {
    console.log(msg);
  });
  console.log('socket', req.params);
});

export default router;
