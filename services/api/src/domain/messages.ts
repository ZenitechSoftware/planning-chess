import { GameWebSocket } from './GameRoom';
import { Player } from './player';

export enum MessageType {
  PlayerSuccessfullyJoined = 'PlayerSuccessfullyJoined',
  PlayerAlreadyExists = 'PlayerAlreadyExists',
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
  Ping = 'Ping',
  Pong = 'Pong',
}

export type SendMessagePayloads = {
  [MessageType.NewBoardState]: PlaceFigureMessage[];
  [MessageType.FigureMoved]: PlaceFigureMessage[];
  [MessageType.ClearBoard]: void;
  [MessageType.SetMyTurn]: PlaceFigureMessage;
  [MessageType.PlayerConnected]: Player[];
  [MessageType.PlayerDisconnected]: Player[];
  [MessageType.MoveSkipped]: Player[];
  [MessageType.RemovePlayer]: string;
  [MessageType.PlayerAlreadyExists]: void;
  [MessageType.UpdatePlayerList]: Player[];
  [MessageType.PlayerSuccessfullyJoined]: string;
};

export interface SendMessage<T extends keyof SendMessagePayloads> {
  type: T;
  payload?: SendMessagePayloads[T];
}

export type ReceivedMessagePayloads = {
  [MessageType.PlayerConnected]: PlayerConnectedMessage;
  [MessageType.FigureMoved]: PlaceFigureMessage;
  [MessageType.MoveSkipped]: MoveSkippedMessage;
  [MessageType.RemovePlayer]: RemovePlayerMessage;
  [MessageType.ClearBoard]: void;
};

export interface ReceivedMessage<T extends keyof ReceivedMessagePayloads> {
  type: T;
  payload?: ReceivedMessagePayloads[T];
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
export interface PlayerConnectedMessage {
  playerName: string;
  id: string | undefined;
}

export interface Handler {
  (ws: GameWebSocket, payload: unknown): void;
}
