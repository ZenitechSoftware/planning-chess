export enum PlayerStatus {
  MoveSkipped = 'MoveSkipped',
  FigurePlaced = 'FigurePlaced',
  ActionNotTaken = 'ActionNotTaken',
}

export interface Player {
  id: string;
  name: string;
  color: {
    background: {
      r: number;
      g: number;
      b: number;
    };
    text: {
      r: number;
      g: number;
      b: number;
    };
  };
  status: PlayerStatus;
}
