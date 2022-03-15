export enum PlayerStatus {
  MoveSkipped = 'MoveSkipped',
  FigurePlaced = 'FigurePlaced',
  ActionNotTaken = 'ActionNotTaken',
}
export interface Player {
  id: string;
  name: string;
  status: PlayerStatus;
}
