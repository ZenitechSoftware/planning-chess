import HTTP from '../http';

export const validateGameRoomUUID = (uuidString) =>
  HTTP.get(`/api/game/${uuidString}`);
