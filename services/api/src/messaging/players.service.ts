import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus } from '../domain';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getPlayerAvatarColor } from '../helpers/getPlayerAvatarColor';
import logger from '../logger';
import {
  Handler,
  Message,
  MessageType,
  UpdatePlayerListMessage,
  PlaceFigureMessage,
  MoveSkippedMessage,
  RemovePlayerMessage,
} from '../domain/messages';
import * as gameService from '../game/game.service';

const players = new Map<WebSocket, Player>();

const findPlayerById = (id: string): [WebSocket, Player] | [null, null] => {
  return (
    Array.from(players.entries()).find(([_, player]) => player.id === id) || [
      null,
      null,
    ]
  );
};

const figureMoved: Handler = (ws, payload: PlaceFigureMessage): void => {
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  players.set(ws, {
    ...players.get(ws),
    status: PlayerStatus.FigurePlaced,
  });
  const newBoardState = gameService.figureMoved(payload);
  const areAllPlayersDone = Array.from(players.values()).every(
    (player) => player.status === 'FigurePlaced',
  );

  publish({ type: MessageType.FigureMoved, payload: newBoardState });
  if (areAllPlayersDone) {
    publish({ type: MessageType.NewBoardState, payload: newBoardState });
  }
};

const setDefaultStatusForPlayers = (): void => {
  for (const values of players.values()) {
    values.status = PlayerStatus.ActionNotTaken;
  }
};

export const clearBoard = (): void => {
  gameService.clearBoard();
  setDefaultStatusForPlayers();
  publish({ type: MessageType.ClearBoard, payload: [] });
  publish({ type: MessageType.NewBoardState, payload: [] });
};

export const checkIfUserAlreadyExists = (ws: WebSocket): void => {
  const myTurn = gameService.findMoveByPlayerName(players.get(ws)?.name);

  if (myTurn) {
    players.set(ws, {
      ...players.get(ws),
      status: PlayerStatus.FigurePlaced,
    });
    publish({ type: MessageType.SetMyTurn, payload: myTurn });
  }
};

const moveSkipped: Handler = (ws, { userId }: MoveSkippedMessage): void => {
  const [playerConnection, player] = findPlayerById(userId);
  try {
    if (!player) {
      throw new Error(`Player with id ${userId} not found`);
    }
    if (player.status !== PlayerStatus.ActionNotTaken) {
      throw new Error(`Player ${userId} cannot skip a move`);
    }
    logger.info(`Player ${player?.name} skips a move.`);
    players.set(playerConnection, {
      ...players.get(playerConnection),
      status: PlayerStatus.MoveSkipped,
    });
    publish({
      type: MessageType.MoveSkipped,
      payload: Array.from(players.values()),
    });
  } catch (err) {
    logger.error(err?.message);
  }
};

const removePlayer: Handler = (ws, { userId }: RemovePlayerMessage): void => {
  const [playerConnection, player] = findPlayerById(userId);
  try {
    if (!player) {
      throw new Error(`Player with id ${userId} not found`);
    }
    publish({
      type: MessageType.RemovePlayer,
      payload: userId,
    });

    players.delete(playerConnection);
    logger.info(`Player ${player?.name} removed`);
    publish({
      type: MessageType.UpdatePlayerList,
      payload: Array.from(players.values()),
    });
  } catch (err) {
    logger.error(err?.message);
  }
};

const playerConnected: Handler = (
  ws,
  payload: UpdatePlayerListMessage,
): void => {
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
  publish({ type: MessageType.UpdatePlayerList, payload: allPlayers });
};

export const subscribe = (
  ws: WebSocket,
  { playerName }: UpdatePlayerListMessage,
): void => {
  logger.info(`New player "${playerName}" joined the game.`);
  const newPlayer: Player = {
    id: uuidv4(),
    name: playerName,
    color: getPlayerAvatarColor(),
    status: PlayerStatus.ActionNotTaken,
  };
  players.set(ws, newPlayer);

  checkIfUserAlreadyExists(ws);
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
  [MessageType.ClearBoard]: clearBoard,
  [MessageType.RemovePlayer]: removePlayer,
};

const getHandler = (type: MessageType): Handler => handlers[type];

export const newMessageReceived = (ws: WebSocket, message: Message): void => {
  getHandler(message.type)(ws, message.payload);
};
