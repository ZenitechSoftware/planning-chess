import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Player, PlayerStatus, PlayerRole } from '../domain';
import { GameState } from '../domain/game';
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
  AvatarUpdateMessage,
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

export const findPlayerByConnection = (ws: GameWebSocket): Player => {
  const players = gameRoomService.getPlayers(ws.roomId);
  const player = players.get(ws);
  if (!player) {
    throw new Error('player with this ws connection not found');
  }
  return player;
};

export const checkIfLastToVote = (
  roomId: string,
  playerId: string,
): boolean => {
  const player = findPlayerById(roomId, playerId);
  const voters = gameService.getVoters(roomId);
  const votersWhoMadeMoveCount = gameService.getVoterWhoMadeActionCount(roomId);
  const playerCount = gameRoomService.getPlayers(roomId).size;

  const isOneVoteMissing = playerCount === votersWhoMadeMoveCount + 1;
  const hasPlayerMoved = player[1].status !== PlayerStatus.ActionNotTaken;

  if (isOneVoteMissing && voters.length > 1 && !hasPlayerMoved) {
    return true;
  }
  return false;
};

const playerExists = (roomId: string, playerId: string): boolean => {
  try {
    findPlayerById(roomId, playerId);
    return true;
  } catch {
    return false;
  }
};

const publishFinalBoard = (ws: GameWebSocket): void => {
  const newBoardState = gameRoomService.getTurns(ws.roomId);

  publish(ws.roomId, {
    type: MessageType.NewBoardState,
    payload: newBoardState,
  });
};

export const figureMoved: Handler = (ws, payload: PlaceFigureMessage): void => {
  if (gameRoomService.getGameState(ws.roomId) === GameState.GAME_FINISHED) {
    return;
  }

  const players = getPlayers(ws.roomId);
  logger.info(`Player ${players.get(ws)?.name} moved a figure.`);
  players.set(ws, {
    ...players.get(ws),
    status: PlayerStatus.FigurePlaced,
  });
  const newBoardState = gameService.figureMoved(ws.roomId, payload);

  /*TODO check these 3 methods, maybe we don't need all 3*/
  publish(ws.roomId, { type: MessageType.ActionMade, payload: newBoardState });
  publishAllPlayers(ws.roomId);
  if (gameService.areAllPlayersDone(ws.roomId)) {
    publishFinalBoard(ws);
    // TODO: send a message that the game is finished
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
  if (gameService.getVoters.length < 2) {
    gameRoomService.setGameState(ws.roomId, GameState.GAME_NOT_STARTED);
  } else {
    gameRoomService.setGameState(ws.roomId, GameState.GAME_IN_PROGRESS);
  }
  setDefaultStatusForPlayers(ws);
  publishBoard(ws.roomId);
  publishAllPlayers(ws.roomId);
};

export const moveSkipped: Handler = (
  ws,
  { playerId }: MoveSkippedMessage,
): void => {
  const players = getPlayers(ws.roomId);
  if (gameRoomService.getGameState(ws.roomId) === GameState.GAME_FINISHED) {
    return;
  }

  try {
    const [playerConnection, player] = findPlayerById(ws.roomId, playerId);

    if (player.role === PlayerRole.Spectator) {
      return;
    }

    if (gameService.playerHasPlacedFigure(ws.roomId, playerId)) {
      gameService.removeTurn(ws.roomId, playerId);
    }

    gameService.moveSkipped(ws.roomId, playerId);

    logger.info(`Player ${player?.name} skips a move.`);
    players.set(playerConnection, {
      ...players.get(playerConnection),
      status: PlayerStatus.MoveSkipped,
    });

    publish(ws.roomId, {
      type: MessageType.MoveSkipped,
      payload: Array.from(players.values()),
    });
    publish(ws.roomId, {
      type: MessageType.ActionMade,
      payload: gameRoomService.getTurns(ws.roomId),
    });
    if (gameService.areAllPlayersDone(ws.roomId)) {
      publishFinalBoard(ws);
      // TODO: send a message that the game is done
    }
  } catch (err) {
    logger.error(err?.message);
  }
};

const createNewPlayer = (params: {
  playerId: string;
  playerName: string;
  role: PlayerRole;
  roomId: string;
  avatar: string;
}): Player => {
  const newPlayer: Player = {
    id: params.playerId,
    name: params.playerName,
    avatar: params.avatar,
    color: getPlayerAvatarColor(),
    role: params.role,
    status: PlayerStatus.ActionNotTaken,
  };

  if (gameService.playerHasPlacedFigure(params.roomId, params.playerId)) {
    newPlayer.status = PlayerStatus.FigurePlaced;
  } else if (gameService.playerHasSkipped(params.roomId, params.playerId)) {
    newPlayer.status = PlayerStatus.MoveSkipped;
  } else if (gameRoomService.getGameState(params.roomId) === GameState.GAME_FINISHED) {
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
  { playerName, id, role, avatar }: PlayerConnectedMessage,
): void => {
  const newPlayerId = id ? id : uuidv4();
  const avatarUrl = avatar;

  if (playerExists(ws.roomId, id)) {
    sendMessage(ws, MessageType.PlayerAlreadyExists);
    return;
  }

  const newPlayer: Player = createNewPlayer({
    playerId: newPlayerId,
    playerName,
    avatar: avatarUrl,
    role: role ? role : PlayerRole.Voter,
    roomId: ws.roomId,
  });

  successfullyJoined(ws, newPlayerId);
  subscribe(ws, newPlayer);

  if (newPlayer.status !== PlayerStatus.ActionNotTaken) {
    const myTurn = gameService.findMoveByPlayerId(ws.roomId, newPlayerId);
    sendMessage(ws, MessageType.SetMyTurn, myTurn);
  }

  if (gameRoomService.getGameState(ws.roomId) === GameState.GAME_NOT_STARTED) {
    if (gameService.getVoters(ws.roomId).length > 1) {
      gameRoomService.setGameState(ws.roomId, GameState.GAME_IN_PROGRESS);
    }
  }

  publishAllPlayers(ws.roomId);
  // TODO: send a gameState to FE

  if (gameService.areAllPlayersDone(ws.roomId)) {
    publishFinalBoard(ws);
  }
};

export const updateAvatar: Handler = (
  ws,
  { url }: AvatarUpdateMessage,
): void => {
  const players = getPlayers(ws.roomId);

  players.set(ws, {
    ...players.get(ws),
    avatar: url,
  });
  publishAllPlayers(ws.roomId);
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
};

export const unsubscribe = (ws: GameWebSocket): void => {
  const players = getPlayers(ws.roomId);
  const playerId = findPlayerByConnection(ws).id;

  if (
    gameService.getVoters(ws.roomId).length === 2
    && gameRoomService.getGameState(ws.roomId) !== GameState.GAME_FINISHED
  ) {
    gameRoomService.setGameState(ws.roomId, GameState.GAME_NOT_STARTED);
  } else if (checkIfLastToVote(ws.roomId, playerId)) {
    players.delete(ws);
    setTimeout(() => {
      try {
        const player = findPlayerById(ws.roomId, playerId);
        if (player) {
          return;
        }
      } catch (err) {
        logger.error(err?.message);
        logger.info('Publishing: player disconnected the game.');
        gameRoomService.setGameState(ws.roomId, GameState.GAME_FINISHED);
        const allPlayers = Array.from(players.values());
        publish(ws.roomId, {
          type: MessageType.PlayerDisconnected,
          payload: allPlayers,
        });
        publishFinalBoard(ws);
      }
    }, 2000);
    return;
  }

  logger.info(`Unsubscribing player ${players.get(ws)?.name}`);
  players.delete(ws);

  logger.info('Publishing: player disconnected the game.');
  const allPlayers = Array.from(players.values());
  publish(ws.roomId, {
    type: MessageType.PlayerDisconnected,
    payload: allPlayers,
  });

  if (gameService.areAllPlayersDone(ws.roomId)) {
    publishFinalBoard(ws);
  }
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
  [MessageType.AvatarUpdate]: updateAvatar,
};

export const voterHandlers: { [key in MessageType]?: Handler } = {
  [MessageType.FigureMoved]: figureMoved,
  [MessageType.MoveSkipped]: moveSkipped,
  [MessageType.ClearBoard]: resetGame,
  [MessageType.AvatarUpdate]: updateAvatar,
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
