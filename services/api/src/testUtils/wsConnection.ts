import WebSocket from 'ws';
import { GameWebSocket } from '../domain/GameRoom';

const roomId = 'abcd-1234';

export const ws: GameWebSocket = new WebSocket('') as GameWebSocket;
ws.roomId = roomId;
