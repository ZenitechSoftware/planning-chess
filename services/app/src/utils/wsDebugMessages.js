/* eslint-disable no-console */
export const wsDebugMessages = (ws) => {

  ws.addEventListener('message', (event) => {
    const { type, payload } = JSON.parse(event.data);
    if(type === 'Pong') {
      return;
    }
    console.groupCollapsed(`Message type - ${type}`);
    console.log('Message payload:');
    console.log(payload);
    console.groupEnd(`Message ${type}`);
  });

  ws.addEventListener('close', () => {
    console.log('closed');
  });

  ws.addEventListener('error', (err) => {
    console.log('connection failed');
    console.error(err);
  });
}