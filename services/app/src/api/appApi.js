import APP_EVENT_TYPES from '../constants/appEventTypes';

export const buildPingMessage = () => ({
  type: APP_EVENT_TYPES.PING,
})