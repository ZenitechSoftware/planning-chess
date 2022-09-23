import { WebSocket } from 'ws';

export interface GameWebSocket extends WebSocket {
  roomId: string;
}
