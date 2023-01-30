import { PlaceFigureMessage } from '../domain/messages';
import { calculateScore } from '../helpers/calculate-score';
import * as gameRoomService from './game-room.service';
import logger from '../logger';
import { Turn } from '../domain/game';
import { PlayerStatus, PlayerRole } from '../domain/player';

export const playerHasMove = (roomId: string, playerId: string): boolean =>
  Boolean(findMoveByPlayerId(roomId, playerId));

export const playerHasPlacedFigure = (roomId: string, playerId: string): boolean => {
  const move = findMoveByPlayerId(roomId, playerId);
  return Boolean(move?.turnType === PlayerStatus.FigurePlaced);
};

export const playerHasSkipped = (roomId: string, playerId: string): boolean => {
  const move = findMoveByPlayerId(roomId, playerId);
  return Boolean(move?.turnType === PlayerStatus.MoveSkipped);
};

export const areAllPlayersDone = (roomId: string): boolean => {
  const players = gameRoomService.getPlayers(roomId);
  return Array.from(players.values())
    .filter((p) => p.role === PlayerRole.Voter)
    .every((player) => player.status !== PlayerStatus.ActionNotTaken);
};

export const figureMoved = (
  roomId: string,
  payload: PlaceFigureMessage,
): Turn[] => {
  let score;
  if (payload !== null) {
    score = calculateScore(payload);
  }

  if (playerHasMove(roomId, payload.id)) {
    removeTurn(roomId, payload.id);
  }

  gameRoomService.getTurns(roomId).push({ ...payload, score, turnType: PlayerStatus.FigurePlaced });
  return gameRoomService.getTurns(roomId);
};

export const moveSkipped = (
  roomId: string,
  id: string,
): void => {
  if (playerHasMove(roomId, id)) {
    removeTurn(roomId, id);
  }

  gameRoomService.getTurns(roomId).push({ id, turnType: PlayerStatus.MoveSkipped });
};

export const clearBoard = (roomId: string): void => {
  gameRoomService.getTurns(roomId).length = 0;
};

export const findMoveByPlayerId = (
  roomId: string,
  id: string,
): Turn | undefined =>
  gameRoomService.getTurns(roomId).find((turn) => turn.id === id);

export const getBoard = (roomId: string): Turn[] =>
  gameRoomService.getTurns(roomId);

export const removeTurn = (roomId: string, playerId: string): void => {
  const turns = gameRoomService.getTurns(roomId);
  try {
    const turnIndex = turns.findIndex((turn) => turn.id === playerId);
    if (turnIndex < 0) {
      throw new Error(`Player with ${playerId} id move could not be found`);
    }
    turns.splice(turnIndex, 1);
  } catch (err) {
    logger.error(err?.message);
  }
};
