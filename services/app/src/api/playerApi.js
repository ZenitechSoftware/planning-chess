import WS_EVENT_TYPES from '../constants/wsEventTypes';

export const buildMoveSkippedEventMessage = (playerId) => ({
  type: WS_EVENT_TYPES.MOVE_SKIPPED,
  payload: { playerId },
});

export const buildPlayerConnectedEventMessage = (playerName, id, role) => ({
  type: WS_EVENT_TYPES.PLAYER_CONNECTED,
  payload: { playerName, id, role },
});

export const buildPlayerFigureMovedMessage = (turn) => ({
  type: WS_EVENT_TYPES.FIGURE_MOVED,
  payload: turn,
});