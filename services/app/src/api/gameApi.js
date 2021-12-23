import { get } from '../http';

export default (uuidString) => get(`/api/game/${uuidString}`);
