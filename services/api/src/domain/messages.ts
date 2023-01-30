import { GameWebSocket } from './GameRoom';
import { Player, PlayerRole } from './player';
import { Turn } from '../domain/game';

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
  ClearBoard = 'ClearBoard',
  SetMyTurn = 'SetMyTurn',
  Ping = 'Ping',
  Pong = 'Pong',
  ErrorMessage = 'ErrorMessage',
}

export type SendMessagePayloads = {
  [MessageType.NewBoardState]: Turn[];
  [MessageType.FigureMoved]: Turn[];
  [MessageType.ClearBoard]: void;
  [MessageType.SetMyTurn]: Turn;
  [MessageType.PlayerConnected]: Player[];
  [MessageType.PlayerDisconnected]: Player[];
  [MessageType.MoveSkipped]: Player[];
  [MessageType.PlayerAlreadyExists]: void;
  [MessageType.UpdatePlayerList]: Player[];
  [MessageType.PlayerSuccessfullyJoined]: string;
  [MessageType.ErrorMessage]: string;
  [MessageType.Pong]: void;
};

export interface SendMessage<T extends keyof SendMessagePayloads> {
  type: T;
  payload?: SendMessagePayloads[T];
}

export type ReceivedMessagePayloads = {
  [MessageType.PlayerConnected]: PlayerConnectedMessage;
  [MessageType.FigureMoved]: PlaceFigureMessage;
  [MessageType.MoveSkipped]: MoveSkippedMessage;
  [MessageType.ClearBoard]: void;
  [MessageType.Ping]: void;
};

export interface ReceivedMessage<T extends keyof ReceivedMessagePayloads> {
  type: T;
  payload?: ReceivedMessagePayloads[T];
}

export interface PlaceFigureMessage {
  row: number;
  tile: number;
  figure: string;
  playerId: string;
  score?: number;
}

export interface MoveSkippedMessage {
  playerId: string;
}
export interface PlayerConnectedMessage {
  playerName: string;
  id: string | undefined;
  role: PlayerRole | null;
}

export interface Handler {
  (ws: GameWebSocket, payload: unknown): void;
}
