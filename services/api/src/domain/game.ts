export interface Turn {
  row?: number;
  tile?: number;
  figure?: string;
  player?: string;
  playerId: string;
  score?: number;
  turnType: TurnType;
}

export enum TurnType {
  MoveSkipped = 'MoveSkipped',
  FigurePlaced = 'FigurePlaced',
}

export enum GameState {
  GAME_NOT_STARTED = 'GAME_NOT_STARTED',
  GAME_IN_PROGRESS = 'GAME_IN_PROGRESS',
  GAME_FINISHED = 'GAME_FINISHED',
}
