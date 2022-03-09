import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus } from '../domain';
import logger from '../logger';
import {
  Handler,
  Message,
  MessageType,
  NewPlayerMessage,
  PlaceFigureMessage,
} from '../domain/messages';
import * as gameService from '../game/game.service';

const players = new Map<WebSocket, Player>();

const figureMoved: Handler = (ws, payload: PlaceFigureMessage): void => {
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  players.set(ws, {
    ...players.get(ws),
    status: PlayerStatus.FigurePlaced,
  });
  const newBoardState = gameService.figureMoved(payload);
  const areAllPlayersDone = Array.from(players.values()).every(
    (player: any) => player.status === 'FigurePlaced',
  );

  publish({ type: MessageType.FigureMoved, payload: newBoardState });
  if (areAllPlayersDone) {
    publish({ type: MessageType.NewBoardState, payload: newBoardState });
  }
};

export const clearBoard = (): void => {
  gameService.clearBoard();
  publish({ type: MessageType.ClearBoard, payload: [] });
  publish({ type: MessageType.NewBoardState, payload: [] });
};

export const checkIfUserAlreadyExists = (ws: WebSocket): void => {
  const myTurn = findMoveByPlayerName(players.get(ws).name);

  if (myTurn) {
    players.set(ws, {
      ...players.get(ws),
      status: PlayerStatus.FigurePlaced,
    });
    publish({ type: MessageType.SetMyTurn, payload: myTurn });
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

  checkIfUserAlreadyExists(ws);
};

const findMoveByPlayerName = (name: string) => {
  return gameService.turns.find((turn) => turn.player === name);
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
  [MessageType.ClearBoard]: clearBoard,
};

const getHandler = (type: MessageType): Handler => handlers[type];

export const newMessageReceived = (ws: WebSocket, message: Message): void => {
  getHandler(message.type)(ws, message.payload);
};
