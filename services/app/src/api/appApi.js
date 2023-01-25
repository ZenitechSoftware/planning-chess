import APP_EVENT_TYPES from '../constants/appEventTypes';

export const buildPingMessage = () => ({
  type: APP_EVENT_TYPES.PING,
});

export const buildClearBoardMessage = () => ({
  type: APP_EVENT_TYPES.CLEAR_BOARD,
});