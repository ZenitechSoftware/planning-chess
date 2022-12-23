import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger';
import { Player } from '../domain';
import { PlaceFigureMessage } from '../domain/messages';

interface GameRoom {
  roomId: string;
  server: WebSocketServer;
  players: Map<WebSocket, Player>;
  turns: PlaceFigureMessage[];
}

const rooms = new Map<string, GameRoom>();

export const getOrCreateRoom = (id?: string): GameRoom => {
  const roomId = id ?? uuidv4();
  const room = rooms.get(roomId);

  if (room) {
    logger.info(`Room ${roomId} already exists.`);
    return room;
  }

  const server = new WebSocketServer({
    noServer: true,
  });

  const newRoom = {
    roomId,
    server,
    players: new Map<WebSocket, Player>(),
    turns: <PlaceFigureMessage[]>[],
  };
  rooms.set(roomId, newRoom);

  return newRoom;
};

export const getClients = (id: string): Set<WebSocket> =>
  rooms.get(id)?.server.clients;

export const getPlayers = (id: string): Map<WebSocket, Player> | null =>
  rooms.get(id)?.players || null;

export const getTurns = (id: string): Array<PlaceFigureMessage> =>
  rooms.get(id)?.turns;

export const printRooms = (): void => {
  for (const entry of rooms.entries()) {
    logger.debug(`${entry[0]} -> clients: ${entry[1].server.clients.size}`);
  }
};

export const cleanUp = (id: string): void => {
  if (getClients(id)?.size === 0) {
    logger.info(`Closing game room ${id}`);
    rooms.get(id)?.server.close();
    rooms.delete(id);
  }
};
