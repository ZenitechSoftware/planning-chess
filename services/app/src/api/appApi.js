import WS_EVENT_TYPES from '../constants/wsEventTypes';

export const buildPingMessage = () => ({
  type: WS_EVENT_TYPES.PING,
});

export const buildClearBoardMessage = () => ({
  type: WS_EVENT_TYPES.CLEAR_BOARD,
});