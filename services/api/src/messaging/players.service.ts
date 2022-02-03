import WebSocket from 'ws';
import { Player } from '../domain';
import { uuid } from 'uuidv4';
import logger from '../logger';
import { Handler, Message, MessageType, NewPlayerMessage } from '../domain/messages';
import * as gameService from '../game/game.service';

const players = new Map<WebSocket, Player>();

const figureMoved: Handler = (ws, payload): void => {
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  const newBoardState = gameService.figureMoved(payload);
  publish({ type: MessageType.NewBoardState, payload: newBoardState });
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

export const subscribe = (ws: WebSocket, { playerName }: NewPlayerMessage): void => {
  logger.info(`New player "${playerName}" joined the game.`);
  const newPlayer: Player = {
    id: uuid(),
    name: playerName,
  };
  players.set(ws, newPlayer);
};

export const unsubscribe = (ws: WebSocket): void => {
  const player = players.get(ws);
  logger.info(`Unsubscribing player ${player?.name}`);
  players.delete(ws);
};

export const publish = (message: Message): void => {
  for (const connection of players.keys()) {
    if (connection.readyState === 1) {
      connection.send(JSON.stringify(message));
    }
  }
};

const handlers: { [key in MessageType]?: Handler} = {
  [MessageType.PlayerConnected]: playerConnected,
  [MessageType.FigureMoved]: figureMoved,
};

const getHandler = (type: MessageType): Handler => handlers[type];

export const newMessageReceived = (ws: WebSocket, message: Message): void => {
  getHandler(message.type)(ws, message.payload);
};
