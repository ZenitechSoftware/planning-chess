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
