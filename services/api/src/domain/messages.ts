import WebSocket from 'ws';

export enum MessageType {
  PlayerConnected = 'PlayerConnected',
  NewPlayer = 'NewPlayer',
  PlayerDisconnected = 'PlayerDisconnected',
  FigureMoved = 'FigureMoved',
  NewBoardState = 'NewBoardState',
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
}

export interface NewPlayerMessage {
  playerName: string;
}

export interface Handler {
  (ws: WebSocket, payload: unknown): void;
}
