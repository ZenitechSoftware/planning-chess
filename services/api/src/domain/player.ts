export enum PlayerStatus {
  MoveSkipped = 'MoveSkipped',
  FigurePlaced = 'FigurePlaced',
  ActionNotTaken = 'ActionNotTaken',
}

export interface Player {
  id: string;
  name: string;
  color: PlayerAvatarColor;
  status: PlayerStatus;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface PlayerAvatarColor {
  background: RGB;
  text: RGB;
}
