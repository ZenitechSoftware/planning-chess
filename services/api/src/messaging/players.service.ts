import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus } from '../domain';
import logger from '../logger';
import {
  Handler,
  Message,
  MessageType,
  NewPlayerMessage,
} from '../domain/messages';
import * as gameService from '../game/game.service';

const players = new Map<WebSocket, Player>();

const figureMoved: Handler = (ws, payload): void => {
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  const newBoardState = gameService.figureMoved(payload);
  publish({ type: MessageType.NewBoardState, payload: newBoardState });
};

const moveSkipped: Handler = (ws, payload): void => {
  const { userId } = payload as { userId: string };
  const [playerConnection, player] = Array.from(players.entries()).find(([_, player]) => player.id === userId && player.status === PlayerStatus.ActionNotTaken) || [null, null];
  if (player) {
    logger.info(`Player ${player?.name} skips a move.`);
    players.set(playerConnection, { ...players.get(playerConnection), status: PlayerStatus.MoveSkipped });
    publish({ type: MessageType.MoveSkipped, payload: Array.from(players.values()) });
  }
};

const playerConnected: Handler = (ws, payload: NewPlayerMessage): void => {
  subscribe(ws, payload);
  newPlayerJoined();
};

export const playerDisconnected = (): void => {
  logger.info('Publishing: player disconnected the game.');
  const allPlayers = Array.from(players.values());
  publish({ type: MessageType.PlayerDisconnected, payload: allPlayers });
};

export const newPlayerJoined = (): void => {
  logger.info('Publishing: new player joined the game.');
  const allPlayers = Array.from(players.values());
  publish({ type: MessageType.NewPlayer, payload: allPlayers });
};

export const subscribe = (
  ws: WebSocket,
  { playerName }: NewPlayerMessage,
): void => {
  logger.info(`New player "${playerName}" joined the game.`);
  const newPlayer: Player = {
    id: uuidv4(),
    name: playerName,
    status: PlayerStatus.ActionNotTaken,
  };
  players.set(ws, newPlayer);
};

export const unsubscribe = (ws: WebSocket): void => {
  logger.info(`Unsubscribing player ${players.get(ws)?.name}`);
  players.delete(ws);
};

export const publish = (message: Message): void => {
  for (const connection of players.keys()) {
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }
};

const handlers: { [key in MessageType]?: Handler } = {
  [MessageType.PlayerConnected]: playerConnected,
  [MessageType.FigureMoved]: figureMoved,
  [MessageType.MoveSkipped]: moveSkipped,
};

const getHandler = (type: MessageType): Handler => handlers[type];

export const newMessageReceived = (ws: WebSocket, message: Message): void => {
  getHandler(message.type)(ws, message.payload);
};
