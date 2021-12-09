import HTTP from '../http';

export const getGame = (uuidString) => HTTP.get(`/api/game/${uuidString}`);
