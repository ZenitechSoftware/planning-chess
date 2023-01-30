import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus, PlayerRole } from '../domain';
import { getPlayerAvatarColor } from '../helpers/player-avatar-color';
import logger from '../logger';
import {
  Handler,
  MessageType,
  MoveSkippedMessage,
  PlaceFigureMessage,
  PlayerConnectedMessage,
  SendMessagePayloads,
  SendMessage,
  ReceivedMessagePayloads,
  ReceivedMessage,
} from '../domain/messages';
import * as gameService from '../game/game.service';
import { GameWebSocket } from '../domain/GameRoom';
import * as gameRoomService from '../game/game-room.service';

const getPlayers = (roomId: string): Map<WebSocket, Player> =>
  gameRoomService.getPlayers(roomId);

export const findPlayerById = (
  roomId: string,
  id: string,
): [WebSocket, Player] => {
  const players = getPlayers(roomId);
  const player = Array.from(players.entries()).find(
    ([_, player]) => player.id === id,
  );
  if (!player) {
    throw new Error(`player with id ${id} not found`);
  }
  return player;
};

const playerExists = (roomId: string, playerId: string): boolean => {
  try {
    findPlayerById(roomId, playerId);
    return true;
  } catch {
    return false;
  }
};

const publishFinalBoard = (
  ws: GameWebSocket,
): void => {
  const newBoardState = gameRoomService.getTurns(ws.roomId);

  publish(ws.roomId, {
    type: MessageType.NewBoardState,
    payload: newBoardState,
  });
};

export const figureMoved: Handler = (ws, payload: PlaceFigureMessage): void => {
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
  if (gameService.areAllPlayersDone(ws.roomId)) {
    publishFinalBoard(ws);
  }
};

const setDefaultStatusForPlayers = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  for (const values of players.values()) {
    values.status = PlayerStatus.ActionNotTaken;
  }
};

export const resetGame = (ws: GameWebSocket): void => {
  gameService.clearBoard(ws.roomId);
  setDefaultStatusForPlayers(ws);
  publish(ws.roomId, { type: MessageType.ClearBoard });
  publishBoard(ws.roomId);
  publishAllPlayers(ws.roomId);
};

export const moveSkipped: Handler = (
  ws,
  { userId }: MoveSkippedMessage,
): void => {
  const players = getPlayers(ws.roomId);

  try {
    const [playerConnection, player] = findPlayerById(ws.roomId, userId);

    if (player.role === PlayerRole.Spectator) {
      return;
    }

    if (gameService.playerHasPlacedFigure(ws.roomId, userId)) {
      gameService.removeTurn(ws.roomId, userId);
    }

    gameService.moveSkipped(ws.roomId, userId);

    logger.info(`Player ${player?.name} skips a move.`);
    players.set(playerConnection, {
      ...players.get(playerConnection),
      status: PlayerStatus.MoveSkipped,
    });

    publish(ws.roomId, {
      type: MessageType.MoveSkipped,
      payload: Array.from(players.values()),
    });
    if (gameService.areAllPlayersDone(ws.roomId)) {
      publishFinalBoard(ws);
    }
  } catch (err) {
    logger.error(err?.message);
  }
};

const createNewPlayer = (params: {
  playerId: string,
  playerName: string,
  role: PlayerRole,
  roomId: string,
}): Player => {
  const newPlayer: Player = {
    id: params.playerId,
    name: params.playerName,
    color: getPlayerAvatarColor(),
    role: params.role,
    status: PlayerStatus.ActionNotTaken,
  };

  if (gameService.playerHasPlacedFigure(params.roomId, params.playerId)) {
    newPlayer.status = PlayerStatus.FigurePlaced;
  } else if (gameService.playerHasSkipped(params.roomId, params.playerId)) {
    newPlayer.status = PlayerStatus.MoveSkipped;
  }

  return newPlayer;
};

export const successfullyJoined = (
  ws: GameWebSocket,
  playerId: string,
): void => {
  sendMessage(ws, MessageType.PlayerSuccessfullyJoined, playerId);
};

export const playerConnected: Handler = (
  ws,
  { playerName, id, role }: PlayerConnectedMessage,
): void => {
  const newPlayerId = id ? id : uuidv4();

  if (playerExists(ws.roomId, id)) {
    sendMessage(ws, MessageType.PlayerAlreadyExists);
    return;
  }

  const newPlayer: Player = createNewPlayer({
    playerId: newPlayerId,
    playerName,
    role: role ? role : PlayerRole.Voter,
    roomId: ws.roomId,
  });

  successfullyJoined(ws, newPlayerId);
  subscribe(ws, newPlayer);

  if (newPlayer.status !== PlayerStatus.ActionNotTaken) {
    const myTurn = gameService.findMoveByPlayerId(ws.roomId, newPlayerId);
    sendMessage(ws, MessageType.SetMyTurn, myTurn);
  }

  if (gameService.areAllPlayersDone(ws.roomId)) {
    publishFinalBoard(ws);
  }

  newPlayerJoined(ws.roomId);
};

export const newPlayerJoined = (roomId: string): void => {
  logger.info('Publishing: new player joined the game.');
  publishAllPlayers(roomId);
};

export const publishAllPlayers = (roomId: string): void => {
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

export const ping: Handler = (ws: GameWebSocket): void => {
  sendMessage(ws, MessageType.Pong);
};

export const subscribe = (ws: GameWebSocket, newPlayer: Player): void => {
  const players = getPlayers(ws.roomId);
  logger.info(`New player "${newPlayer.name}" joined the game.`);
  players.set(ws, newPlayer);
  publishAllPlayers(ws.roomId);
};

export const unsubscribe = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  logger.info(`Unsubscribing player ${players.get(ws)?.name}`);
  players.delete(ws);

  logger.info('Publishing: player disconnected the game.');
  const allPlayers = Array.from(players.values());
  publish(ws.roomId, {
    type: MessageType.PlayerDisconnected,
    payload: allPlayers,
  });
};

export const publish = <T extends keyof SendMessagePayloads>(
  roomId: string,
  message: SendMessage<T>,
): void => {
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

export const sendMessage = <T extends keyof SendMessagePayloads>(
  ws: GameWebSocket,
  type: T,
  payload?: SendMessagePayloads[T],
): void => {
  const messagePayload = { type, payload };
  sendJSON(ws, messagePayload);
};

export const errorHandler = (ws: GameWebSocket, e: string): void => {
  sendMessage(ws, MessageType.ErrorMessage, e);
};

export const spectatorHandlers: { [key in MessageType]?: Handler } = {
  [MessageType.ClearBoard]: resetGame,
  [MessageType.MoveSkipped]: moveSkipped,
};

export const voterHandlers: { [key in MessageType]?: Handler } = {
  [MessageType.FigureMoved]: figureMoved,
  [MessageType.MoveSkipped]: moveSkipped,
  [MessageType.ClearBoard]: resetGame,
};

const commonHandlers: { [key in MessageType]?: Handler } = {
  [MessageType.Ping]: ping,
  [MessageType.PlayerConnected]: playerConnected,
};

export const getHandler = (
  type: MessageType,
  role: PlayerRole | undefined,
): Handler | null => {
  if (type in commonHandlers) {
    return commonHandlers[type];
  }

  if (role === PlayerRole.Voter) {
    return voterHandlers[type];
  }

  if (role === PlayerRole.Spectator) {
    return spectatorHandlers[type];
  }
};

export const newMessageReceived = <T extends keyof ReceivedMessagePayloads>(
  ws: GameWebSocket,
  message: ReceivedMessage<T>,
): void => {
  const playerRole = getPlayers(ws.roomId).get(ws)?.role;
  try {
    const messageHandler = getHandler(message.type, playerRole);
    if (messageHandler) {
      messageHandler(ws, message.payload);
    } else {
      throw new Error(
        `Could not find / access handler for message type ${message.type}`,
      );
    }
  } catch (e) {
    errorHandler(ws, e);
  }
};
