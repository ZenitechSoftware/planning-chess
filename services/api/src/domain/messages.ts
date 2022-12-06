import { GameWebSocket } from './GameRoom';

export enum MessageType {
  PlayerSuccessfullyJoined = 'PlayerSuccessfullyJoined',
  PlayerConnected = 'PlayerConnected',
  UpdatePlayerList = 'UpdatePlayerList',
  PlayerDisconnected = 'PlayerDisconnected',
  FigureMoved = 'FigureMoved',
  PlayerFinishMove = 'PlayerFinishMove',
  NewBoardState = 'NewBoardState',
  MoveSkipped = 'MoveSkipped',
  RemovePlayer = 'RemovePlayer',
  ClearBoard = 'ClearBoard',
  SetMyTurn = 'SetMyTurn',
}

export interface Message {
  type: MessageType;
  payload: unknown;
}

export interface PlaceFigureMessage {
  row: number;
  tile: number;
  figure: string;
  player: string;
  id: string;
  score?: number;
}

export interface MoveSkippedMessage {
  userId: string;
}

export interface RemovePlayerMessage {
  userId: string;
}

export interface UpdatePlayerListMessage {
  playerName: string;
}

export interface Handler {
  (ws: GameWebSocket, payload: unknown): void;
}
