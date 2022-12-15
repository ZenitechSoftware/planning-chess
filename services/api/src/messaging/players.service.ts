import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus } from '../domain';
import { getPlayerAvatarColor } from '../helpers/player-avatar-color';
import logger from '../logger';
import {
  Handler,
  Message,
  MessageType,
  MoveSkippedMessage,
  PlaceFigureMessage,
  RemovePlayerMessage,
  PlayerConnectedMessage,
} from '../domain/messages';
import * as gameService from '../game/game.service';
import { GameWebSocket } from '../domain/GameRoom';
import * as gameRoomService from '../game/game-room.service';

const getPlayers = (roomId: string): Map<WebSocket, Player> =>
  gameRoomService.getPlayers(roomId);

const findPlayerById = (
  roomId: string,
  id: string,
): [WebSocket, Player] | null => {
  const players = getPlayers(roomId);
  if (!players) {
    return null;
  }
  return Array.from(players.entries()).find(([_, player]) => player.id === id);
};

const publishFinalBoard = (
  ws: GameWebSocket,
  players: Map<WebSocket, Player>,
): void => {
  const areAllPlayersDone = Array.from(players.values()).every(
    (players) => players.status !== 'ActionNotTaken',
  );
  const newBoardState = gameRoomService.getTurns(ws.roomId);

  if (areAllPlayersDone) {
    publish(ws.roomId, {
      type: MessageType.NewBoardState,
      payload: newBoardState,
    });
  }
};

const figureMoved: Handler = (ws, payload: PlaceFigureMessage): void => {
  const players = getPlayers(ws.roomId);
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  players.set(ws, {
    ...players.get(ws),
    status: PlayerStatus.FigurePlaced,
  });
  const newBoardState = gameService.figureMoved(ws.roomId, payload);

  /*TODO check these 3 methods, maybe we don't need all 3*/
  publish(ws.roomId, { type: MessageType.FigureMoved, payload: newBoardState });
  publishAllPlayers(ws.roomId);
  publishFinalBoard(ws, players);
};

const setDefaultStatusForPlayers = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  for (const values of players.values()) {
    values.status = PlayerStatus.ActionNotTaken;
  }
};

export const clearBoard = (ws: GameWebSocket): void => {
  gameService.clearBoard(ws.roomId);
  setDefaultStatusForPlayers(ws);
  publish(ws.roomId, { type: MessageType.ClearBoard, payload: [] });
  publishBoard(ws.roomId);
  publishAllPlayers(ws.roomId);
};

export const checkIfUserAlreadyExists = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  const myTurn = gameService.findMoveByPlayerId(ws.roomId, players.get(ws)?.id);

  if (myTurn) {
    players.set(ws, {
      ...players.get(ws),
      status: PlayerStatus.FigurePlaced,
    });
    publish(ws.roomId, { type: MessageType.SetMyTurn, payload: myTurn });
  }
};

const moveSkipped: Handler = (ws, { userId }: MoveSkippedMessage): void => {
  const players = getPlayers(ws.roomId);

  const result = findPlayerById(ws.roomId, userId);

  if (!result) {
    return;
  }

  if (result) {
    const [playerConnection, player] = result;
    if (player.status !== PlayerStatus.ActionNotTaken) {
      return;
    }
    logger.info(`Player ${player?.name} skips a move.`);
    players.set(playerConnection, {
      ...players.get(playerConnection),
      status: PlayerStatus.MoveSkipped,
    });
    publish(ws.roomId, {
      type: MessageType.MoveSkipped,
      payload: Array.from(players.values()),
    });
    publishFinalBoard(ws, players);
  }
};

const removePlayer: Handler = (ws, { userId }: RemovePlayerMessage): void => {
  const players = getPlayers(ws.roomId);

  const result = findPlayerById(ws.roomId, userId);

  if (!result) {
    return;
  }

  if (result) {
    const [playerConnection, player] = result;
    publish(ws.roomId, {
      type: MessageType.RemovePlayer,
      payload: userId,
    });
    players.delete(playerConnection);
    logger.info(`Player ${player?.name} removed`);
    publishAllPlayers(ws.roomId);
  }
};

const successfullyJoined = (ws: GameWebSocket, playerId: string): void => {
  sendMessage(ws, MessageType.PlayerSuccessfullyJoined, playerId);
};

const playerConnected: Handler = (
  ws,
  { playerName, id }: PlayerConnectedMessage,
): void => {
  const newPlayerId = id ? id : uuidv4();
  const doesSamePlayerExists = !!findPlayerById(ws.roomId, id);

  if (doesSamePlayerExists) {
    sendMessage(ws, MessageType.PlayerAlreadyExists);
    return;
  }

  const newPlayer: Player = {
    id: newPlayerId,
    name: playerName,
    color: getPlayerAvatarColor(),
    status: gameService.findMoveByPlayerId(ws.roomId, newPlayerId)
      ? PlayerStatus.FigurePlaced
      : PlayerStatus.ActionNotTaken,
  };

  successfullyJoined(ws, newPlayerId);
  subscribe(ws, newPlayer);
  newPlayerJoined(ws.roomId);
};

export const playerDisconnected = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  logger.info('Publishing: player disconnected the game.');
  const allPlayers = Array.from(players.values());
  publish(ws.roomId, {
    type: MessageType.PlayerDisconnected,
    payload: allPlayers,
  });
};

export const newPlayerJoined = (roomId: string): void => {
  logger.info('Publishing: new player joined the game.');
  publishAllPlayers(roomId);
};

const publishAllPlayers = (roomId: string) => {
  publish(roomId, {
    type: MessageType.UpdatePlayerList,
    payload: Array.from(getPlayers(roomId).values()),
  });
};

const publishBoard = (roomId: string) => {
  publish(roomId, {
    type: MessageType.NewBoardState,
    payload: gameService.getBoard(roomId),
  });
};

export const subscribe = (ws: GameWebSocket, newPlayer: Player): void => {
  const players = getPlayers(ws.roomId);
  logger.info(`New player "${newPlayer.name}" joined the game.`);
  players.set(ws, newPlayer);

  checkIfUserAlreadyExists(ws);
};

export const unsubscribe = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  logger.info(`Unsubscribing player ${players.get(ws)?.name}`);
  players.delete(ws);
};

export const publish = (roomId: string, message: Message): void => {
  const players = getPlayers(roomId);
  for (const connection of players.keys()) {
    if (connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }
};

export const sendJSON = (
  ws: GameWebSocket,
  data: Record<string, unknown>,
): void => {
  const jsonPayload = JSON.stringify(data);
  ws.send(jsonPayload);
};

type MessagePayloads = {
  [MessageType.PlayerAlreadyExists]: void;
  [MessageType.UpdatePlayerList]: Player[];
  [MessageType.PlayerSuccessfullyJoined]: string;
};

export const sendMessage = <T extends keyof MessagePayloads>(
  ws: GameWebSocket,
  type: T,
  payload?: MessagePayloads[T],
): void => {
  const messagePayload = { type, payload };
  sendJSON(ws, messagePayload);
};

const handlers: { [key in MessageType]?: Handler } = {
  [MessageType.PlayerConnected]: playerConnected,
  [MessageType.FigureMoved]: figureMoved,
  [MessageType.MoveSkipped]: moveSkipped,
  [MessageType.ClearBoard]: clearBoard,
  [MessageType.RemovePlayer]: removePlayer,
};

const getHandler = (type: MessageType): Handler => handlers[type];

export const newMessageReceived = (
  ws: GameWebSocket,
  message: Message,
): void => {
  getHandler(message.type)(ws, message.payload);
};
