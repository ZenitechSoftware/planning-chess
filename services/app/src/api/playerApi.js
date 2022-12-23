import PLAYER_EVENT_TYPES from '../constants/playerEventTypes';

export const buildMoveSkippedEventMessage = (userId) => ({
  type: PLAYER_EVENT_TYPES.MOVE_SKIPPED,
  payload: { userId },
});

export const buildRemovePlayerEventMessage = (userId) => ({
  type: PLAYER_EVENT_TYPES.REMOVE_PLAYER,
  payload: { userId },
});

export const buildPlayerConnectedEventMessage = (playerName, id) => ({
  type: PLAYER_EVENT_TYPES.PLAYER_CONNECTED,
  payload: { playerName, id },
});